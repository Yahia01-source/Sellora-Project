import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TenantModule } from './tenant/tenant.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, TenantModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
