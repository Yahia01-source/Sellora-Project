import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { TenantModule } from './tenant/tenant.module';
import { DashboardModule } from './modules/dashboard/dashboard.module'; import { AppController } from './app.controller';
import { CategoryModule } from './modules/category/category.module';
import { StoreModule } from './modules/store/store.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CustomerModule } from './modules/customer/customer.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),

    PrismaModule,
    TenantModule,
    StoreModule,
    DashboardModule,
    CategoryModule,
    AuthModule,
    ProductModule,
    InventoryModule,
    CustomerModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}