import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupModifierDto } from './create-group-modifier.dto';

export class UpdateGroupModifierDto extends PartialType(CreateGroupModifierDto) {}