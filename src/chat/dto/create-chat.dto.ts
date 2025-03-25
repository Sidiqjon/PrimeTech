import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ description: 'Message content', example: 'Hello, is this still available?' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Sender user ID', example: 1 })
  @IsInt()
  @IsNotEmpty()
  fromId: number;

  @ApiProperty({ description: 'Receiver user ID', example: 2 })
  @IsInt()
  @IsNotEmpty()
  toId: number;

  @ApiProperty({ description: 'Product ID the chat is related to', example: 5 })
  @IsInt()
  @IsNotEmpty()
  productId: number;
}