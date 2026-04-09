import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
<<<<<<< HEAD
  @ApiProperty({ example: 'admin@pizza.com', description: 'User email' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'securePassword123', description: 'User password (min 6 chars)' })
=======
  @ApiProperty({
    example: 'admin@pizza.com',
    description: 'The email address used for login',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'The user password',
  })
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  @IsString()
  @MinLength(6)
  password: string;
}
