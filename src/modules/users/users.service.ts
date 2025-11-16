import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(data: Partial<User>): Promise<User> {
    if (!data.password) throw new Error('Password is required');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    const user = new this.userModel(data);
    return user.save();
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    if (!data) {
      throw new Error('No data provided for update');
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (data.email) {
      user.email = data.email;
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(data.password, salt);
    }

    return user.save();
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException(`User with id ${id} not found`);
    return deletedUser;
  }
}