import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSiteMetadataDto {
  @ApiProperty({ description: 'About information', example: 'This is a tech store' })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiProperty({ description: 'Privacy Policy', example: 'We protect your data...' })
  @IsString()
  @IsOptional()
  privacyPolicy?: string;

  @ApiProperty({ description: 'Support Email', example: 'support@site.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Support Phone Number', example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({ description: 'Social Media Links', example: '{ "facebook": "fb.com/site" }' })
  @IsOptional()
  socialMedia?: Record<string, string>;
}