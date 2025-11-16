// src/modifiers/modifiers.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modifier } from './schemas/modifier.schema';
import { CreateModifierDto } from './dtos/create-modifier.dto';
import { UpdateModifierDto } from './dtos/update-modifier.dto';

@Injectable()
export class ModifiersService {
  constructor(@InjectModel(Modifier.name) private modifierModel: Model<Modifier>) {}

  async findAll(): Promise<Modifier[]> {
    return this.modifierModel.find().exec();
  }

  async findOne(id: string): Promise<Modifier> {
    const modifier = await this.modifierModel.findById(id).exec();
    if (!modifier) {
      throw new NotFoundException(`Modifier with ID ${id} not found`);
    }
    return modifier;
  }

  async create(createModifierDto: CreateModifierDto): Promise<Modifier> {
    const newModifier = new this.modifierModel(createModifierDto);
    return newModifier.save();
  }

  async update(id: string, updateModifierDto: UpdateModifierDto): Promise<Modifier> {
    const updatedModifier = await this.modifierModel.findByIdAndUpdate(id, updateModifierDto, { new: true }).exec();
    if (!updatedModifier) {
      throw new NotFoundException(`Modifier with ID ${id} not found`);
    }
    return updatedModifier;
  }

  async remove(id: string): Promise<Modifier> {
    const deletedModifier = await this.modifierModel.findByIdAndDelete(id).exec();
    if (!deletedModifier) {
      throw new NotFoundException(`Modifier with ID ${id} not found`);
    }
    return deletedModifier;
  }
}