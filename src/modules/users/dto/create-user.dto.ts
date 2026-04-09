<<<<<<< HEAD
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'dev@pizza.com', description: 'User email address' })
=======
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'dev@pizza.com',
    description: 'User email address',
  })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

<<<<<<< HEAD
  @ApiProperty({ example: 'securePassword123', description: 'Min 6 characters' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
=======
  @ApiProperty({
    example: 'securePassword123',
    description: 'User password (minimum 6 characters)',
  })
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  password: string;
}
