import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsNumber, IsArray } from 'class-validator';
import { Condition, Currency, ProductStatus, TradeType } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'MacBook Pro' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Product price', example: 1299.99 })
  @IsDecimal()
  price: number;

  @ApiProperty({ description: 'Currency type', enum: Currency, example: Currency.USD })
  @IsEnum(Currency)
  currency: Currency;

  @ApiProperty({ description: 'Quantity available', example: 10 })
  @IsInt()
  quantity: number;

  @ApiProperty({ description: 'Product description', example: 'Latest model with M2 chip' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Condition of the product', enum: Condition, example: Condition.NEW })
  @IsEnum(Condition)
  condition: Condition;

  @ApiProperty({ description: 'Trade type', enum: TradeType, example: TradeType.SALE })
  @IsEnum(TradeType)
  tradeType: TradeType;

  @ApiProperty({ description: 'Location of the product', example: 'New York, USA' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ description: 'Product status', enum: ProductStatus, example: ProductStatus.PENDING })
  @IsOptional()
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @ApiProperty({ description: 'Category ID', example: 1 })
  @IsInt()
  categoryId: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  userId: number;
}

