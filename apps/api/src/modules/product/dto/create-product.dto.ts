import {
  IsString,
  IsOptional,
  IsNumber,
  IsInt,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsInt()
  stock?: number;

  @IsUUID()
  categoryId!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  @IsOptional()
@IsString()
sku?: string;

@IsOptional()
@IsString()
barcode?: string;
}
