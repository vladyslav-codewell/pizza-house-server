
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GroupModifier } from './schemas/group-modifier.schema';
import { CreateGroupModifierDto } from './dtos/create-group-modifier.dto';
import { UpdateGroupModifierDto } from './dtos/update-group-modifier.dto';

@Injectable()
export class GroupModifiersService {
  constructor(@InjectModel(GroupModifier.name) private groupModifierModel: Model<GroupModifier>) {}

  async findAll(): Promise<GroupModifier[]> {
    return this.groupModifierModel.find().exec();
  }

  async findOne(id: string): Promise<GroupModifier> {
    const groupModifier = await this.groupModifierModel.findById(id).exec();
    if (!groupModifier) {
      throw new NotFoundException(`GroupModifier with ID ${id} not found`);
    }
    return groupModifier;
  }

  async create(createGroupModifierDto: CreateGroupModifierDto): Promise<GroupModifier> {
    const newGroupModifier = new this.groupModifierModel(createGroupModifierDto);
    return newGroupModifier.save();
  }

  async update(id: string, updateGroupModifierDto: UpdateGroupModifierDto): Promise<GroupModifier> {
    const updatedGroupModifier = await this.groupModifierModel.findByIdAndUpdate(id, updateGroupModifierDto, { new: true }).exec();
    if (!updatedGroupModifier) {
      throw new NotFoundException(`GroupModifier with ID ${id} not found`);
    }
    return updatedGroupModifier;
  }

  async remove(id: string): Promise<GroupModifier> {
    const deletedGroupModifier = await this.groupModifierModel.findByIdAndDelete(id).exec();
    if (!deletedGroupModifier) {
      throw new NotFoundException(`GroupModifier with ID ${id} not found`);
    }
    return deletedGroupModifier;
  }
}