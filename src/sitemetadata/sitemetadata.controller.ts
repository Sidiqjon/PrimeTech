import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SiteMetadataService } from './sitemetadata.service';
import { CreateSiteMetadataDto } from './dto/create-sitemetadata.dto';
import { UpdateSitemetadataDto } from './dto/update-sitemetadata.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Site Metadata')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('site-metadata')
export class SiteMetadataController {
  constructor(private readonly siteMetadataService: SiteMetadataService) {}

  @Post()
  create(@Body() dto: CreateSiteMetadataDto) {
    return this.siteMetadataService.create(dto);
  }

  @Get()
  find() {
    return this.siteMetadataService.find();
  }

  @Patch()
  update(@Body() dto: UpdateSitemetadataDto) {
    return this.siteMetadataService.update(dto);
  }
}
