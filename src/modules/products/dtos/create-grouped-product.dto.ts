import { IsString, IsArray, IsOptional, IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

// Виносимо DTO для зображення
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

export class CreateGroupedProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly category_id: string; 

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly image?: ImageDto;

  @IsNumber()
  @IsOptional()
  readonly order?: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  readonly products: string[]; 
}