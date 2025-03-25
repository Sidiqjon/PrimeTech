import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async likeProduct(@Body() dto: CreateLikeDto) {
    return this.likeService.likeProduct(dto);
  }

  @Delete(':userId/:productId')
  async unlikeProduct(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.likeService.unlikeProduct(+userId, +productId);
  }

  @Get('product/:productId')
  async getProductLikes(@Param('productId') productId: number) {
    return this.likeService.getProductLikes(+productId);
  }

  @Get('user/:userId')
  async getUserLikes(@Param('userId') userId: number) {
    return this.likeService.getUserLikes(+userId);
  }
}
