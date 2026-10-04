import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ManagersService } from './managers.service.js';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
import { Auth } from '../auth/decorators/auth.decorator.js';
import { ROLES } from '../auth/constants/roles.constants.js';
import { ApiAuth } from '../auth/decorators/api.decorator.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Managers')
@ApiAuth()
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth(ROLES.ADMIN)
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Auth(ROLES.ADMIN, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.managersService.findOne(id);
  }

  @Auth(ROLES.ADMIN)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth(ROLES.ADMIN)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.managersService.remove(id);
  }
}
