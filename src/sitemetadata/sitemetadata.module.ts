import { Module } from '@nestjs/common';
import { SiteMetadataService } from './sitemetadata.service';
import { SiteMetadataController } from './sitemetadata.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SiteMetadataController],
  providers: [SiteMetadataService, PrismaService],
})
export class SiteMetadataModule {}