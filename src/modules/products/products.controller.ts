// src/products/products.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateGroupedProductDto } from './dtos/create-grouped-product.dto';
import { UpdateGroupedProductDto } from './dtos/update-grouped-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto, 'dtos')
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('grouped')
  async getAllGroupedProducts() {
    return this.productsService.getAllGroupedProducts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Get('grouped/:id')
  async getGroupedProductById(@Param('id') id: string) {
    return this.productsService.getGroupedProductById(id);
  }

  @Post('grouped')
  async createGroupedProduct(@Body() createGroupedProductDto: CreateGroupedProductDto) {
    return this.productsService.createGroupedProduct(createGroupedProductDto);
  }

  @Patch('grouped/:id')
  async updateGroupedProduct(
    @Param('id') id: string, 
    @Body() updateGroupedProductDto: UpdateGroupedProductDto, // Використовуємо DTO для оновлення
  ) {
    return this.productsService.updateGroupedProduct(id, updateGroupedProductDto);
  }
}