import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
import { Manager } from './entities/manager.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagersService {

  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}


  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findBy({
      managerId: id
    })
    if(!manager) throw new NotFoundException();
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const newManager = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })

    if(!newManager) throw new NotFoundException();
    return this.managerRepository.save(newManager);
  }

  async remove(id: string) {
    return await this.managerRepository.delete({
      managerId: id
    })
  }
}
