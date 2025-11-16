import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateModifierDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  @IsOptional()
  readonly weight?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;
}