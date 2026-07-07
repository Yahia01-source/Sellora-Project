import {
  Injectable,
  NestMiddleware,
  NotFoundException,
  ForbiddenException,
  Logger,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PrismaService } from "../../prisma/prisma.service";
import { StoreStatus } from "@prisma/client";

export interface ITenantContext {
  storeId: string;
  subdomain: string;
  slug: string;
  storeName: string;
  status: string;
  plan: string;
  settings: Record<string, unknown>;
}

export interface TenantRequest extends Request {
  tenant: ITenantContext;
}

interface CacheEntry {
  context: ITenantContext;
  cachedAt: number;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);
  private readonly storeCache = new Map<string, CacheEntry>();
  private readonly CACHE_TTL_MS = 5 * 60 * 1000;

  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const subdomain = this.extractSubdomain(req);
    if (!subdomain) return next();

    try {
      const tenantContext = await this.resolveTenant(subdomain);
      (req as TenantRequest).tenant = tenantContext;
      this.logger.debug(`Tenant resolved: ${subdomain} -> storeId: ${tenantContext.storeId}`);
      next();
    } catch (error) {
      next(error);
    }
  }

  private extractSubdomain(req: Request): string | null {
    const host = req.hostname ?? (req.headers.host ?? "");
    const hostname = host.split(":")[0] ?? "";
    const parts = hostname.split(".");
    if (parts.length < 2) return null;
    const subdomain = parts[0];
    const reserved = new Set(["www", "api", "admin", "app", "mail", "cdn"]);
    if (!subdomain || reserved.has(subdomain)) return null;
    return subdomain;
  }

  private async resolveTenant(subdomain: string): Promise<ITenantContext> {
    const cached = this.storeCache.get(subdomain);
    if (cached && Date.now() - cached.cachedAt < this.CACHE_TTL_MS) {
      return cached.context;
    }

    const store = await this.prisma.store.findUnique({
      where: { subdomain },
      select: { id: true, subdomain: true, slug: true, name: true, status: true, plan: true, tenantConfig: true },
    });

    if (!store) {
      this.logger.warn(`Tenant not found: "${subdomain}"`);
      throw new NotFoundException(`Store "${subdomain}" not found.`);
    }

    if (store.status === StoreStatus.SUSPENDED) {
      throw new ForbiddenException(`Store "${subdomain}" is suspended.`);
    }

    if (store.status === StoreStatus.PENDING) {
      throw new ForbiddenException(`Store "${subdomain}" is pending approval.`);
    }

    const context: ITenantContext = {
      storeId: store.id,
      subdomain: store.subdomain ?? subdomain,
      slug: store.slug,
      storeName: store.name,
      status: store.status,
      plan: store.plan,
      settings: (store.tenantConfig as Record<string, unknown>) ?? {},
    };

    this.storeCache.set(subdomain, { context, cachedAt: Date.now() });
    return context;
  }

  invalidateCache(subdomain: string): void {
    this.storeCache.delete(subdomain);
    this.logger.log(`Cache invalidated: ${subdomain}`);
  }
}
