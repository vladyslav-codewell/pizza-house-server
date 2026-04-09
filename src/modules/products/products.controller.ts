<<<<<<< HEAD
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
=======
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateGroupedProductDto } from './dtos/create-grouped-product.dto';
import { UpdateGroupedProductDto } from './dtos/update-grouped-product.dto';
import { Public } from '../auth/auth.guard';

<<<<<<< HEAD
@ApiTags('Products')
=======
@ApiTags('Products & Catalog') // Grouping for Swagger UI
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

<<<<<<< HEAD
  // ── Grouped Products ─────────────────────────────────────────────────────────

  @Public()
  @Get('grouped')
  @ApiOperation({ summary: 'Get all grouped products (full catalog with variants)' })
  @ApiResponse({ status: 200, description: 'Array of grouped products with populated variants' })
  getAllGrouped() {
    return this.productsService.getAllGroupedProducts();
  }

  @Public()
  @Get('grouped/:id')
  @ApiOperation({ summary: 'Get grouped product by ID' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId of the grouped product' })
  @ApiResponse({ status: 200, description: 'Grouped product with all variants populated' })
  @ApiResponse({ status: 404, description: 'Grouped product not found' })
  getGroupedById(@Param('id') id: string) {
    return this.productsService.getGroupedProductById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Post('grouped')
  @ApiOperation({ summary: 'Create grouped product (pizza group with size variants)' })
  @ApiResponse({ status: 201, description: 'Grouped product created' })
  createGrouped(@Body() dto: CreateGroupedProductDto) {
    return this.productsService.createGroupedProduct(dto);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('grouped/:id')
  @ApiOperation({ summary: 'Update grouped product' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  updateGrouped(@Param('id') id: string, @Body() dto: UpdateGroupedProductDto) {
    return this.productsService.updateGroupedProduct(id, dto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete('grouped/:id')
  @ApiOperation({ summary: 'Delete grouped product' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  removeGrouped(@Param('id') id: string) {
    return this.productsService.removeGroupedProduct(id);
  }

  // ── Single Product Variants ───────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all product variants' })
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get product variant by ID (with modifiers populated)' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  @ApiResponse({ status: 404, description: 'Product not found' })
=======
  // --- Grouped Products Endpoints (Higher priority routes) ---

  @Public()
  @Get('grouped')
  @ApiOperation({
    summary: 'Get all grouped product collections (e.g., Pizza series)',
  })
  async getAllGroupedProducts() {
    return this.productsService.getAllGroupedProducts();
  }

  @Public()
  @Get('grouped/:id')
  @ApiOperation({ summary: 'Get a specific grouped product by ID' })
  @ApiParam({ name: 'id', description: 'Grouped Product MongoDB ObjectID' })
  async getGroupedProductById(@Param('id') id: string) {
    return this.productsService.getGroupedProductById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Post('grouped')
  @ApiOperation({ summary: 'Create a new grouped product collection' })
  async createGroupedProduct(
    @Body() createGroupedProductDto: CreateGroupedProductDto,
  ) {
    return this.productsService.createGroupedProduct(createGroupedProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('grouped/:id')
  @ApiOperation({ summary: 'Update a grouped product collection' })
  async updateGroupedProduct(
    @Param('id') id: string,
    @Body() updateGroupedProductDto: UpdateGroupedProductDto,
  ) {
    return this.productsService.updateGroupedProduct(
      id,
      updateGroupedProductDto,
    );
  }

  // --- Single Product Variant Endpoints ---

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all individual product variants' })
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific product variant by ID' })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Post()
<<<<<<< HEAD
  @ApiOperation({ summary: 'Create a product variant (e.g., Pizza 30cm)' })
  @ApiResponse({ status: 201, description: 'Product created' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
=======
  @ApiOperation({ summary: 'Create a new standalone product variant' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
<<<<<<< HEAD
  @ApiOperation({ summary: 'Update product variant' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
=======
  @ApiOperation({ summary: 'Update an existing product variant' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
<<<<<<< HEAD
  @ApiOperation({ summary: 'Delete product variant' })
  @ApiParam({ name: 'id', description: 'MongoDB ObjectId' })
=======
  @ApiOperation({ summary: 'Remove a product variant from the database' })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
