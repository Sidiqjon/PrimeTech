import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateColorDto) {
    return this.prisma.color.create({ data: dto });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [colors, total] = await this.prisma.$transaction([
      this.prisma.color.findMany({ skip, take: limit }),
      this.prisma.color.count(),
    ]);

    return { colors, total, page, limit };
  }

  async findOne(id: number) {
    const color = await this.prisma.color.findUnique({ where: { id } });
    if (!color) throw new NotFoundException('Color not found');
    return color;
  }

  async update(id: number, dto: UpdateColorDto) {
    await this.findOne(id);
    return this.prisma.color.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.color.delete({ where: { id } });
  }
}
