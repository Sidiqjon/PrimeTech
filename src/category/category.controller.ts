// import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
// import { CategoryService } from './category.service';
// import { CreateCategoryDto } from './dto/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
// import { CategoryType } from '@prisma/client';

// @ApiTags('categories')
// @Controller('categories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new category' })
//   create(@Body() dto: CreateCategoryDto) {
//     return this.categoryService.create(dto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all categories with pagination and filtering' })
//   @ApiQuery({ name: 'page', required: false, example: 1 })
//   @ApiQuery({ name: 'limit', required: false, example: 10 })
//   @ApiQuery({ name: 'type', enum: CategoryType, required: false })
//   findAll(@Query('page') page?: number, @Query('limit') limit?: number, @Query('type') type?: CategoryType) {
//     return this.categoryService.findAll(Number(page) || 1, Number(limit) || 10, type);
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get a category by ID' })
//   findOne(@Param('id') id: string) {
//     return this.categoryService.findOne(Number(id));
//   }

//   @Patch(':id')
//   @ApiOperation({ summary: 'Update a category by ID' })
//   update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
//     return this.categoryService.update(Number(id), dto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a category by ID' })
//   remove(@Param('id') id: string) {
//     return this.categoryService.remove(Number(id));
//   }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    enum: ['PHONE', 'ACCESSORIES', 'LAPTOP', 'ELECTRONICS'],
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get()
  findAll(@Query() query: any) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}