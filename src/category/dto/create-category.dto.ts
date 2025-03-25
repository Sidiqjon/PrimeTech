import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryType } from '@prisma/client';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Category name', example: 'IPads' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Category type', enum: CategoryType, example: CategoryType.LAPTOPS })
  @IsEnum(CategoryType)
  type: CategoryType;
}
