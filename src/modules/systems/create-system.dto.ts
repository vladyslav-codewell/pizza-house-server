import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSystemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}