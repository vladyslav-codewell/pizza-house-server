import { Controller, Get, Post, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './schemas/role.schema';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getRoles(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Post()
  async createRole(@Body() data: Partial<Role>): Promise<Role> {
    return this.rolesService.create(data);
  }
}