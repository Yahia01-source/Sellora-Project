import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import {  OrderStatus,} from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateOrderDto,
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

    if (!dto.items.length) {
      throw new BadRequestException(
        'Order must contain at least one item',
      );
    }

    const customer =
      await this.prisma.customer.findFirst({
        where: {
          id: dto.customerId,
          storeId: user.storeId,
        },
      });

    if (!customer) {
      throw new BadRequestException(
        'Customer not found',
      );
    }

    const productIds = dto.items.map(
      (item) => item.productId,
    );

    const products =
      await this.prisma.product.findMany({
        where: {
          id: {
            in: productIds,
          },
          storeId: user.storeId,
          isActive: true,
        },
      });

    if (products.length !== productIds.length) {
      throw new BadRequestException(
        'One or more products not found',
      );
    }

    const productMap = new Map(
      products.map((product) => [
        product.id,
        product,
      ]),
    );

    let subtotal = 0;

    const orderItems = dto.items.map((item) => {
      const product = productMap.get(
        item.productId,
      );

      if (!product) {
        throw new BadRequestException(
          'Product not found',
        );
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${product.name}`,
        );
      }

      const unitPrice = Number(product.price);
      const total =
        unitPrice * item.quantity;

      subtotal += total;

      return {
        productId: product.id,
        quantity: item.quantity,
        unitPrice,
        total,
      };
    });

    const shipping = dto.shipping ?? 0;
    const total = subtotal + shipping;

    const orderNumber =
      `ORD-${Date.now()}`;

    return this.prisma.$transaction(
      async (tx) => {
        const order =
          await tx.order.create({
            data: {
              orderNumber,
              customerId: customer.id,
              storeId: user.storeId!,
              status: 'PENDING',
              subtotal,
              shipping,
              total,
              items: {
                create: orderItems,
              },
            },
            include: {
              customer: true,
              items: {
                include: {
                  product: true,
                },
              },
            },
          });

        return order;
      },
    );
  }
async confirm(
  userId: string,
  orderId: string,
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

  const storeId = user.storeId;

  return this.prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: {
        id: orderId,
        storeId: storeId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new BadRequestException(
        'Order not found',
      );
    }

    if (order.status !== 'PENDING') {
      throw new BadRequestException(
        'Only pending orders can be confirmed',
      );
    }

    for (const item of order.items) {
      const productId = item.productId;

      const product = await tx.product.findFirst({
        where: {
          id: productId,
          storeId: storeId,
          isActive: true,
        },
      });

      if (!product) {
        throw new BadRequestException(
          'Product not found',
        );
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product: ${product.name}`,
        );
      }

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });

      await tx.inventoryMovement.create({
        data: {
          productId: product.id,
          type: 'OUT',
          quantity: item.quantity,
          reason: `Order ${order.orderNumber}`,
        },
      });
    }

    return tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: 'CONFIRMED',
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  });
}
async findAll(
  userId: string,
  query: QueryOrderDto,
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

  const storeId = user.storeId;

  const page = query.page ?? 1;
  const limit = query.limit ?? 20;

  const where = {
    storeId,

    ...(query.status
      ? {
          status: query.status,
        }
      : {}),

    ...(query.search
      ? {
          OR: [
            {
              orderNumber: {
                contains: query.search,
                mode: 'insensitive' as const,
              },
            },
            {
              customer: {
                firstName: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              customer: {
                lastName: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              customer: {
                phone: {
                  contains: query.search,
                },
              },
            },
          ],
        }
      : {}),
  };

  const [orders, total] =
    await this.prisma.$transaction([
      this.prisma.order.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      }),

      this.prisma.order.count({
        where,
      }),
    ]);

  return {
    data: orders,

    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
async findOne(
  userId: string,
  orderId: string,
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

  const order = await this.prisma.order.findFirst({
    where: {
      id: orderId,
      storeId: user.storeId,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    throw new BadRequestException(
      'Order not found',
    );
  }

  return order;
}
async updateStatus(
  userId: string,
  orderId: string,
  newStatus: OrderStatus,
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

  const order = await this.prisma.order.findFirst({
    where: {
      id: orderId,
      storeId: user.storeId,
    },
  });

  if (!order) {
    throw new BadRequestException(
      'Order not found',
    );
  }

  const allowedTransitions: Record<
    OrderStatus,
    OrderStatus[]
  > = {
    PENDING: ['CONFIRMED', 'CANCELLED'],
    CONFIRMED: ['PROCESSING', 'CANCELLED'],
    PROCESSING: ['SHIPPED', 'CANCELLED'],
    SHIPPED: ['DELIVERED'],
    DELIVERED: [],
    CANCELLED: [],
  };

  if (
    !allowedTransitions[order.status].includes(
      newStatus,
    )
  ) {
    throw new BadRequestException(
      `Cannot change order status from ${order.status} to ${newStatus}`,
    );
  }

  return this.prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: newStatus,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
async cancel(
  userId: string,
  orderId: string,
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

  const storeId = user.storeId;

  return this.prisma.$transaction(async (tx) => {
    const order = await tx.order.findFirst({
      where: {
        id: orderId,
        storeId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new BadRequestException(
        'Order not found',
      );
    }

    if (
      !['PENDING', 'CONFIRMED', 'PROCESSING'].includes(
        order.status,
      )
    ) {
      throw new BadRequestException(
        `Order cannot be cancelled from ${order.status} status`,
      );
    }

    // Stock was already deducted when order was confirmed
    if (
      order.status === 'CONFIRMED' ||
      order.status === 'PROCESSING'
    ) {
      for (const item of order.items) {
        const product = await tx.product.findFirst({
          where: {
            id: item.productId,
            storeId,
          },
        });

        if (!product) {
          throw new BadRequestException(
            `Product not found: ${item.productId}`,
          );
        }

        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });

        await tx.inventoryMovement.create({
          data: {
            productId: product.id,
            type: 'IN',
            quantity: item.quantity,
            reason: `Order ${order.orderNumber} cancelled`,
          },
        });
      }
    }

    return tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: 'CANCELLED',
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  });
}
}