import {
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
  MinLength,
} from 'class-validator';

import { StorePlan, StoreStatus } from '@prisma/client';

export class CreateStoreDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

@IsOptional()
@IsString()
  @IsOptional()
  @IsEnum(StoreStatus)
  status?: StoreStatus;

  @IsOptional()
  @IsEnum(StorePlan)
  plan?: StorePlan;
}