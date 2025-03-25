import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Quantity of the product', example: 2 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Total price of the order', example: 2599.98 })
  @IsDecimal()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}