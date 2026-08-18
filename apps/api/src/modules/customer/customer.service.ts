import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    userId: string,
    dto: CreateCustomerDto,
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

    return this.prisma.customer.create({
      data: {
        ...dto,
        storeId: user.storeId,
      },
    });
  }

async findAll(
  userId: string,
  query: QueryCustomerDto,
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

  const { page, limit, search } = query;

  const where = {
    storeId: user.storeId,

    ...(search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              lastName: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              phone: {
                contains: search,
              },
            },
          ],
        }
      : {}),
  };

  const [customers, total] =
    await this.prisma.$transaction([
      this.prisma.customer.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.customer.count({
        where,
      }),
    ]);

  return {
    data: customers,
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
    id: string,
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

    const customer =
      await this.prisma.customer.findFirst({
        where: {
          id,
          storeId: user.storeId,
        },
      });

    if (!customer) {
      throw new BadRequestException(
        'Customer not found',
      );
    }

    return customer;
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateCustomerDto,
  ) {
    const customer =
      await this.findOne(userId, id);

    return this.prisma.customer.update({
      where: {
        id: customer.id,
      },
      data: dto,
    });
  }

  async archive(
  userId: string,
  id: string,
) {
  const customer = await this.findOne(
    userId,
    id,
  );

  return this.prisma.customer.update({
    where: {
      id: customer.id,
    },
    data: {
      isActive: false,
    },
  });
}

async remove(
  userId: string,
  id: string,
) {
  const customer =
    await this.findOne(userId, id);

  const orderCount =
    await this.prisma.order.count({
      where: {
        customerId: customer.id,
      },
    });

  if (orderCount > 0) {
    throw new BadRequestException(
      'Customer cannot be deleted because they have existing orders.',
    );
  }

  return this.prisma.customer.delete({
    where: {
      id: customer.id,
    },
  });
}
}