import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateChatDto) {
    return this.prisma.chat.create({
      data: {
        message: dto.message,
        fromId: dto.fromId,
        toId: dto.toId,
        productId: dto.productId,
      },
    });
  }

  async findChats(fromId: number, toId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const where = {
      OR: [
        { fromId, toId },
        { fromId: toId, toId: fromId },
      ],
    };

    const [chats, total] = await this.prisma.$transaction([
      this.prisma.chat.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      this.prisma.chat.count({ where }),
    ]);

    return { chats, total, page, limit };
  }

  async findChatsByProduct(productId: number) {
    const chats = await this.prisma.chat.findMany({
      where: { productId },
      orderBy: { createdAt: 'asc' },
    });

    if (!chats.length) throw new NotFoundException('No chats found for this product');
    return chats;
  }
}
