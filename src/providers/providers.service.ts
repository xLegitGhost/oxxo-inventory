import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return `This action returns all providers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} provider`;
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: string) {
    return `This action removes a #${id} provider`;
  }
}
