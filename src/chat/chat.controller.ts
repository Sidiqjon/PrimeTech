import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@ApiTags('chats')
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message' })
  create(@Body() dto: CreateChatDto) {
    return this.chatService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get chat messages between two users' })
  @ApiQuery({ name: 'fromId', required: true, example: 1 })
  @ApiQuery({ name: 'toId', required: true, example: 2 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findChats(@Query('fromId') fromId: number, @Query('toId') toId: number, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.chatService.findChats(Number(fromId), Number(toId), Number(page) || 1, Number(limit) || 10);
  }

  @Get('product')
  @ApiOperation({ summary: 'Get chat messages for a specific product' })
  @ApiQuery({ name: 'productId', required: true, example: 5 })
  findChatsByProduct(@Query('productId') productId: number) {
    return this.chatService.findChatsByProduct(Number(productId));
  }
}
