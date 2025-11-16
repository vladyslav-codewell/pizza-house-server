// src/modifiers/group-modifiers.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { GroupModifiersService } from './group-modifiers.service';
import { CreateGroupModifierDto } from './dtos/create-group-modifier.dto';
import { UpdateGroupModifierDto } from './dtos/update-group-modifier.dto';

@Controller('group-modifiers')
export class GroupModifiersController {
  constructor(private readonly groupModifiersService: GroupModifiersService) {}

  @Post()
  create(@Body() createGroupModifierDto: CreateGroupModifierDto) {
    return this.groupModifiersService.create(createGroupModifierDto);
  }

  @Get()
  findAll() {
    return this.groupModifiersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupModifiersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupModifierDto: UpdateGroupModifierDto) {
    return this.groupModifiersService.update(id, updateGroupModifierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupModifiersService.remove(id);
  }
}