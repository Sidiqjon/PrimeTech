import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @ApiProperty({ description: 'Name of the color', example: 'Red' })
  @IsString()
  @IsNotEmpty()
  name: string;
}