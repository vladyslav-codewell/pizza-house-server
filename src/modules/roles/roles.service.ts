import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async create(data: Partial<Role>): Promise<Role> {
    const role = new this.roleModel(data);
    return role.save();
  }
}
