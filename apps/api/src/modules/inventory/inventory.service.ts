import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // =========================
  // INVENTORY IN
  // =========================

  async createIn(
    userId: string,
    dto: CreateInventoryDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user?.storeId) {
      throw new BadRequestException(
        'User has no store',
      );
    }

    const product =
      await this.prisma.product.findFirst({
        where: {
          id: dto.productId,
          storeId: user.storeId,
        },
      });

    if (!product) {
      throw new BadRequestException(
        'Product not found',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const movement =
        await tx.inventoryMovement.create({
          data: {
            productId: product.id,
            type: 'IN',
            quantity: dto.quantity,
            reason: dto.reason,
          },
        });

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            increment: dto.quantity,
          },
        },
      });

      return movement;
    });
  }

  // =========================
  // INVENTORY OUT
  // =========================

  async createOut(
    userId: string,
    dto: CreateInventoryDto,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user?.storeId) {
      throw new BadRequestException(
        'User has no store',
      );
    }

    const product =
      await this.prisma.product.findFirst({
        where: {
          id: dto.productId,
          storeId: user.storeId,
        },
      });

    if (!product) {
      throw new BadRequestException(
        'Product not found',
      );
    }

    // ما نخرجوش أكثر من stock الموجود
    if (product.stock < dto.quantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${product.stock}`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const movement =
        await tx.inventoryMovement.create({
          data: {
            productId: product.id,
            type: 'OUT',
            quantity: dto.quantity,
            reason: dto.reason,
          },
        });

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: dto.quantity,
          },
        },
      });

      return movement;
    });
  }
async getMovements(
  userId: string,
  productId: string,
) {
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user?.storeId) {
    throw new BadRequestException(
      'User has no store',
    );
  }

  const product = await this.prisma.product.findFirst({
    where: {
      id: productId,
      storeId: user.storeId,
    },
  });

  if (!product) {
    throw new BadRequestException(
      'Product not found',
    );
  }

  return this.prisma.inventoryMovement.findMany({
    where: {
      productId: product.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}}