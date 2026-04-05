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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateGroupedProductDto } from './dtos/create-grouped-product.dto';
import { UpdateGroupedProductDto } from './dtos/update-grouped-product.dto';
import { Public } from '../auth/auth.guard';

@ApiTags('Products & Catalog') // Grouping for Swagger UI
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Post()
  @ApiOperation({ summary: 'Create a new standalone product variant' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product variant' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Remove a product variant from the database' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
