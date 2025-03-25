import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: { ...dto } });
  }

  async findAll(page: number = 1, limit: number = 10, status?: ProductStatus) {
    const skip = (page - 1) * limit;
    const where = status ? { status } : {};

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({ where, skip, take: limit, include: { user: true, category: true } }),
      this.prisma.product.count({ where }),
    ]);

    return { products, total, page, limit };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id }, include: { user: true, category: true } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
