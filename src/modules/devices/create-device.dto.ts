import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsArray, IsEnum, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class CredentialDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  description?: string;
}

class CharacteristicsDto {
  @IsString()
  @IsOptional()
  cpu?: string;

  @IsString()
  @IsOptional()
  ram?: string;

  @IsString()
  @IsOptional()
  storage?: string;

  @IsString()
  @IsOptional()
  os?: string;
}

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['server', 'switch', 'router'])
  type: 'server' | 'switch' | 'router';

  @IsString()
  @IsNotEmpty()
  ipAddress: string;

  @IsMongoId()
  @IsOptional()
  rack?: string;

  @IsMongoId()
  @IsOptional()
  system?: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  unitStart: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  unitSize: number;

  @IsArray()
  @IsOptional()
  credentials?: CredentialDto[];

  @IsOptional()
  characteristics?: CharacteristicsDto;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  services?: string[];
}