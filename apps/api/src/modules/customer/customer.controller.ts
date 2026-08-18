import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { QueryCustomerDto } from './dto/query-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
  ) {}

  @Post()
  create(
    @Req() req: any,
    @Body() dto: CreateCustomerDto,
  ) {
    return this.customerService.create(
      req.user.id,
      dto,
    );
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query() query: QueryCustomerDto,
  ) {
    return this.customerService.findAll(
      req.user.id,
      query,
    );
  }

  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.customerService.findOne(
      req.user.id,
      id,
    );
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customerService.update(
      req.user.id,
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return this.customerService.remove(
      req.user.id,
      id,
    );
  }

  @Patch(':id/archive')
archive(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.customerService.archive(
    req.user.id,
    id,
  );
}
}