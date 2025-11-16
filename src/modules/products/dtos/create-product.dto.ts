import {
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  IsMongoId,
  ValidateNested, // <-- Додано
  IsBoolean // <-- Додано
} from 'class-validator';
import { Type } from 'class-transformer'; // <-- Додано

class ImageDto {
  @IsString()
  @IsOptional()
  large?: string;

  @IsString()
  @IsOptional()
  medium?: string;

  @IsString()
  @IsOptional()
  small?: string;
}

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly weight?: string;

  @IsString()
  @IsOptional()
  readonly unit?: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly category_id: string;

  @ValidateNested() // <-- Додано: для валідації вкладеного об'єкта
  @Type(() => ImageDto) // <-- Додано: для перетворення об'єкта
  @IsOptional()
  readonly image?: ImageDto;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly group_modifiers?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: string[];

  @IsBoolean()
  @IsOptional()
  readonly is_active?: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly well_together_products?: string[];

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly group?: string[];
}