import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Public } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Public()
  @Post()
  async createUser(@Body() data: Partial<User>): Promise<User> {
    return this.usersService.create(data);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: Partial<User>) {
    console.log('Received body:', data);
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }
}
