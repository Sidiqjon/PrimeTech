import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ColorController],
  providers: [ColorService, PrismaService],
})
export class ColorModule {}