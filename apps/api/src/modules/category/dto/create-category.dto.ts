import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 50)
  name!: string;

  @IsString()
  @Length(2, 50)
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

}