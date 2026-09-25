import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity.js';
import { Repository, Like } from 'typeorm';

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
    return this.providerRepository.find({
      relations: {
        products: true
      }
    });
  }

  async findOneByName(providerName: string){
    const provider = await this.providerRepository.findOneBy({
        providerName: Like(`%${providerName}%`)
    })
    if(!provider) throw new NotFoundException(`Provider with name ${providerName} not found`);
    return provider;
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({
      providerId: id
    })
    if(!provider) throw new NotFoundException(`Provider with id ${id} not found`);
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const newProvider = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    })

    if (!newProvider) {
      throw new NotFoundException(`Provider with id ${id} not found`);
    } 

    return this.providerRepository.save(newProvider);
  }

  async remove(id: string) {
    const result = await this.providerRepository.delete({
      providerId: id
    });

    if(result.affected === 0) throw new NotFoundException();

    return {
      message: "Provider eliminado correctamente"
    };
  }
}
