import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProvidersService } from './providers.service.js';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  @Get("name/:providerName")
  findOneByName(@Param('providerName') providerName: string) {
    return this.providersService.findOneByName(providerName)
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: "4"})) id: string) {
    return this.providersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: "4"})) id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: "4"})) id: string) {
    return this.providersService.remove(id);
  }
}
