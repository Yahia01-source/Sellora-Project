import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

async create(userId: string, dto: CreateStoreDto) {
  return this.prisma.$transaction(async (tx) => {
    const store = await tx.store.create({
      data: {
        ...dto,

        tenantConfig: {},

        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        storeId: store.id,
      },
    });

    return store;
  });
}  findAll() {
    return this.prisma.store.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.store.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateStoreDto) {
    return this.prisma.store.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.store.delete({
      where: { id },
    });
  }
}