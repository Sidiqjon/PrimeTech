import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength, IsInt, IsString, IsArray, IsPhoneNumber, IsDate } from 'class-validator';
import { Role, Status } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Region ID (optional)', example: 1, required: false })
  @IsOptional()
  @IsInt()
  regionId?: number;

  @ApiProperty({ description: 'Birth year of the user', example: 1995 })
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty({ description: 'Phone number of the user', example: '+1234567890' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user account', example: 'StrongPassword123!', minLength: 6 })
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'User role', enum: Role, example: Role.USER, required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ description: 'Profile images', example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  img?: string[];

  @ApiProperty({ description: 'User status', enum: Status, example: Status.INACTIVE, required: false })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({ description: 'Last online timestamp', example: '2025-03-25T12:00:00Z', required: false })
  @IsOptional()
  @IsDate()
  onlineAt?: Date;
}
