import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

<<<<<<< HEAD
=======
/**
 * PartialType makes all fields from CreateUserDto optional for the update request
 */
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
export class UpdateUserDto extends PartialType(CreateUserDto) {}
