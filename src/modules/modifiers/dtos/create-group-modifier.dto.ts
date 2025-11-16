import { IsString, IsNotEmpty, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class CreateGroupModifierDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly type?: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly modifiers?: string[];
}