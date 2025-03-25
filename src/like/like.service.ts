import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likeProduct(dto: CreateLikeDto) {
    const { userId, productId } = dto;

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const existingLike = await this.prisma.like.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (existingLike) {
      return { message: 'Product already liked' };
    }

    return this.prisma.like.create({ data: { userId, productId } });
  }

  async unlikeProduct(userId: number, productId: number) {
    const like = await this.prisma.like.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    if (!like) throw new NotFoundException('Like not found');

    await this.prisma.like.delete({ where: { userId_productId: { userId, productId } } });

    return { message: 'Like removed successfully' };
  }

  async getProductLikes(productId: number) {
    return this.prisma.like.count({ where: { productId } });
  }

  async getUserLikes(userId: number) {
    return this.prisma.like.findMany({ where: { userId } });
  }
}
