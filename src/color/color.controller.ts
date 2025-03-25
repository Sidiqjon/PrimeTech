import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@ApiTags('colors')
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new color' })
  create(@Body() dto: CreateColorDto) {
    return this.colorService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all colors with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.colorService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a color by ID' })
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a color by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateColorDto) {
    return this.colorService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a color by ID' })
  remove(@Param('id') id: string) {
    return this.colorService.remove(Number(id));
  }
}
