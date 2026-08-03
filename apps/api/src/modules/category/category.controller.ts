import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Query } from '@nestjs/common';
import { QueryCategoryDto } from './dto/query-category.dto';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

@Post()
@UseGuards(JwtAuthGuard)
create(
  @Req() req: any,
  @Body() dto: CreateCategoryDto,
) {
  return this.categoryService.create(req.user.sub, dto);
}
@Get()
findAll(@Query() query: QueryCategoryDto) {
  return this.categoryService.findAll(query);
}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}