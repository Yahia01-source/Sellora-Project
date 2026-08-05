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
   console.log(req.user);
  return this.categoryService.create(req.user.id, dto);
}
@Get()
@UseGuards(JwtAuthGuard)
findAll(
  @Req() req: any,
  @Query() query: QueryCategoryDto,
) {
  return this.categoryService.findAll(req.user.id, query);
} 
@Get(':id')
@UseGuards(JwtAuthGuard)
findOne(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.categoryService.findOne(req.user.id, id);
}

@Patch(':id')
@UseGuards(JwtAuthGuard)
update(
  @Req() req: any,
  @Param('id') id: string,
  @Body() dto: UpdateCategoryDto,
) {
  return this.categoryService.update(req.user.id, id, dto);
}
@Delete(':id')
@UseGuards(JwtAuthGuard)
remove(
  @Req() req: any,
  @Param('id') id: string,
) {
  return this.categoryService.remove(req.user.id, id);
}
}