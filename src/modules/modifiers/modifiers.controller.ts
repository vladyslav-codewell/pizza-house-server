import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ModifiersService } from './modifiers.service';
import { CreateModifierDto } from './dtos/create-modifier.dto';
import { UpdateModifierDto } from './dtos/update-modifier.dto';

@Controller('modifiers')
export class ModifiersController {
  constructor(private readonly modifiersService: ModifiersService) {}

  @Post()
  create(@Body() createModifierDto: CreateModifierDto) {
    console.log(createModifierDto)
    return this.modifiersService.create(createModifierDto);
  }

  @Get()
  findAll() {
    return this.modifiersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modifiersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModifierDto: UpdateModifierDto) {
    return this.modifiersService.update(id, updateModifierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modifiersService.remove(id);
  }
}