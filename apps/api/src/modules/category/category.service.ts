import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { QueryCategoryDto } from './dto/query-category.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

async create(userId: string, dto: CreateCategoryDto) {

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
  return this.prisma.category.create({
    data: {
      ...dto,
      storeId: user.storeId,
    },
  });
}
async findAll(userId: string, query: QueryCategoryDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user?.storeId) {
    throw new BadRequestException('User has no store');
  }

  const { page, limit } = query;

  return this.prisma.category.findMany({
    where: {
      storeId: user.storeId,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });
} 
async findOne(userId: string, id: string) {

  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });


  if (!user?.storeId) {
    throw new BadRequestException('User has no store');
  }

  const category = await this.prisma.category.findFirst({
    where: {
      id,
      storeId: user.storeId,
    },
  });


  return category;
}async update(
  userId: string,
  id: string,
  dto: UpdateCategoryDto,
) {
  const user = await this.prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user?.storeId) {
    throw new BadRequestException('User has no store');
  }

  const category =
    await this.prisma.category.findFirst({
      where: {
        id,
        storeId: user.storeId,
      },
    });

  if (!category) {
    throw new BadRequestException('Category not found');
  }

  return this.prisma.category.update({
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

  const category =
    await this.prisma.category.findFirst({
      where: {
        id,
        storeId: user.storeId,
      },
    });

  if (!category) {
    throw new BadRequestException(
      'Category not found',
    );
  }

  return this.prisma.category.delete({
    where: {
      id,
    },
  });
}}