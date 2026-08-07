import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async create(
  userId: string,
  dto: CreateProductDto,
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

  const category =
    await this.prisma.category.findFirst({
      where: {
        id: dto.categoryId,
        storeId: user.storeId,
      },
    });

  if (!category) {
    throw new BadRequestException(
      'Category not found',
    );
  }

  return this.prisma.product.create({
    data: {
      ...dto,
      storeId: user.storeId,
    },
  });
}
async findAll(
  userId: string,
  query: QueryProductDto,
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

  const { page, limit } = query;

  return this.prisma.product.findMany({
    where: {
      storeId: user.storeId,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
    },
  });
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

  const product =
    await this.prisma.product.findFirst({
      where: {
        id,
        storeId: user.storeId,
      },
      include: {
        category: true,
      },
    });

  if (!product) {
    throw new BadRequestException(
      'Product not found',
    );
  }

  return product;
}
async update(
  userId: string,
  id: string,
  dto: UpdateProductDto,
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
        id,
        storeId: user.storeId,
      },
    });

  if (!product) {
    throw new BadRequestException(
      'Product not found',
    );
  }

  // إذا بغى يبدل Category
  if (dto.categoryId) {
    const category =
      await this.prisma.category.findFirst({
        where: {
          id: dto.categoryId,
          storeId: user.storeId,
        },
      });

    if (!category) {
      throw new BadRequestException(
        'Category not found',
      );
    }
  }

  return this.prisma.product.update({
    where: {
      id,
    },
    data: dto,
  });
}
async remove(
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

  const product =
    await this.prisma.product.findFirst({
      where: {
        id,
        storeId: user.storeId,
      },
    });

  if (!product) {
    throw new BadRequestException(
      'Product not found',
    );
  }

  return this.prisma.product.delete({
    where: {
      id,
    },
  });
}
}