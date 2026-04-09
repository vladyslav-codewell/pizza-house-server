import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Pizza', description: 'Category title' })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({ example: 'Our signature pizzas' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({ example: 'pizza', description: 'URL slug (unique)' })
  @IsString()
  @IsOptional()
  readonly url?: string;

  @ApiPropertyOptional({ example: '/media/pizza.svg' })
  @IsString()
  @IsOptional()
  readonly image?: string;
<<<<<<< HEAD

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly category_group_products?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly category_products?: string[];
=======
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
}
