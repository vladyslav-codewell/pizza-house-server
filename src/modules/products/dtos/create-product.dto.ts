import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsMongoId,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Nested DTO for product variant images
 */
class ImageDto {
  @ApiPropertyOptional({ example: '/uploads/products/pizza-large.webp' })
  @IsString()
  @IsOptional()
  large?: string;

  @ApiPropertyOptional({ example: '/uploads/products/pizza-medium.webp' })
  @IsString()
  @IsOptional()
  medium?: string;

  @ApiPropertyOptional({ example: '/uploads/products/pizza-small.webp' })
  @IsString()
  @IsOptional()
  small?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 450, description: 'Product price in local currency' })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiPropertyOptional({
    example: '40 cm',
    description: 'Size or weight description',
  })
  @IsString()
  @IsOptional()
  readonly weight?: string;

  @ApiPropertyOptional({ example: 'g.', description: 'Unit of measurement' })
  @IsString()
  @IsOptional()
  readonly unit?: string;

  @ApiProperty({ example: 'Quattro di Carne', description: 'Variant title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({
    example: 'Tomato sauce, mozzarella, bacon, salami, ham...',
    description: 'Detailed product description',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    example: '60c72b2f9b1e8b0015f8a7a1',
    description: 'Reference to the Category ObjectID',
  })
  @IsMongoId()
  @IsNotEmpty()
  readonly category_id: string;

  @ApiPropertyOptional({ type: ImageDto })
  @ValidateNested()
  @Type(() => ImageDto)
  @IsOptional()
  readonly image?: ImageDto;

  @ApiPropertyOptional({
    type: [String],
    description: 'Array of Modifier Group ObjectIDs',
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly group_modifiers?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Spicy', 'Meat'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  readonly is_active?: boolean;

  @ApiPropertyOptional({
    type: [String],
    description: 'Recommended products for cross-selling',
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly well_together_products?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'Internal grouping of product IDs',
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly group?: string[];
}
