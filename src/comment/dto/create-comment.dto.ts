import { IsString, IsNotEmpty, IsInt, IsNumber, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Message cannot be empty' })
  message: string;

  @IsNumber({}, { message: 'Star rating must be a number' })
  @Min(0.0, { message: 'Star rating must be at least 0.0' })
  @Max(5.0, { message: 'Star rating cannot be more than 5.0' })
  star: number;

  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;

  @IsInt({ message: 'Product ID must be an integer' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: number;
}
