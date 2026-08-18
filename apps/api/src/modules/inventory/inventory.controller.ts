import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
  ) {}

  @Post('in')
  @UseGuards(JwtAuthGuard)
  createIn(
    @Req() req: any,
    @Body() dto: CreateInventoryDto,
  ) {
    return this.inventoryService.createIn(
      req.user.id,
      dto,
    );
  }
  @Post('out')
@UseGuards(JwtAuthGuard)
createOut(
  @Req() req: any,
  @Body() dto: CreateInventoryDto,
) {
  return this.inventoryService.createOut(
    req.user.id,
    dto,
  );
}
@Get('movements/:productId')
@UseGuards(JwtAuthGuard)
getMovements(
  @Req() req: any,
  @Param('productId') productId: string,
) {
  return this.inventoryService.getMovements(
    req.user.id,
    productId,
  );
}}