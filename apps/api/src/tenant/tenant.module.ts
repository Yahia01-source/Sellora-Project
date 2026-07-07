import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { TenantGuard } from './guards/tenant.guard';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TenantGuard],
  exports: [TenantGuard],
})
export class TenantModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(TenantMiddleware)
      .exclude(
        { path: 'api/v1/auth/(.*)', method: RequestMethod.ALL },
        { path: 'api/v1/health',    method: RequestMethod.GET },
        { path: 'api/v1/platform/(.*)', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}