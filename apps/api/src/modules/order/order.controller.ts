import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Req,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateOrderDto,
  ) {
    return this.orderService.create(
      req.user.id,
      dto,
    );
  }
@Post(':id/confirm')
confirm(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.orderService.confirm(
    req.user.id,
    id,
  );
}
@Get()
findAll(
  @Req() req: any,
  @Query() query: QueryOrderDto,
) {
  return this.orderService.findAll(
    req.user.id,
    query,
  );
}
@Get(':id')
findOne(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.orderService.findOne(
    req.user.id,
    id,
  );
}
@Patch(':id/status')
updateStatus(
  @Req() req: any,
  @Param('id') id: string,
  @Body() dto: UpdateOrderStatusDto,
) {
  return this.orderService.updateStatus(
    req.user.id,
    id,
    dto.status,
  );
}
@Patch(':id/cancel')
cancel(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.orderService.cancel(
    req.user.id,
    id,
  );
}
}