import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { SocketModule } from 'src/socket/socket.module';
@Module({
  imports: [AuthModule, SocketModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}