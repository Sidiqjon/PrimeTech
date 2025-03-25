import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSiteMetadataDto } from './dto/create-sitemetadata.dto';
import { UpdateSitemetadataDto } from './dto/update-sitemetadata.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SiteMetadataService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSiteMetadataDto) {
    const data = {
      ...dto,
      socialMedia: dto.socialMedia ? JSON.stringify(dto.socialMedia) : Prisma.JsonNull,
    };
    return this.prisma.siteMetadata.create({ data });
  }

  async find() {
    const metadata = await this.prisma.siteMetadata.findFirst();
    if (!metadata) throw new NotFoundException('Site metadata not found');
    return metadata;
  }

  async update(dto: UpdateSitemetadataDto) {
    const metadata = await this.prisma.siteMetadata.findFirst();
    if (!metadata) throw new NotFoundException('Site metadata not found');

    return this.prisma.siteMetadata.update({ where: { id: metadata.id }, data: dto });
  }
}
