import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * PartialType makes all fields from CreateUserDto optional for the update request
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
