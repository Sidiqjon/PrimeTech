// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';

// @ApiTags('orders')
// @Controller('orders')
// export class OrderController {
//   constructor(private readonly orderService: OrderService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new order' })
//   create(@Body() dto: CreateOrderDto) {
//     return this.orderService.create(dto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all orders with pagination' })
//   @ApiQuery({ name: 'page', required: false, example: 1 })
//   @ApiQuery({ name: 'limit', required: false, example: 10 })
//   findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
//     return this.orderService.findAll(Number(page) || 1, Number(limit) || 10);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get an order by ID' })
//   findOne(@Param('id') id: string) {
//     return this.orderService.findOne(Number(id));
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update an order by ID' })
//   update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
//     return this.orderService.update(Number(id), dto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete an order by ID' })
//   remove(@Param('id') id: string) {
//     return this.orderService.remove(Number(id));
//   }
// }

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Create a new order' })
  create(@Body() dto: CreateOrderDto) {
    return this.orderService.create(dto);
  }
}
