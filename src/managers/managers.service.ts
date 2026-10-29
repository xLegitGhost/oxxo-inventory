import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto.js';
import { UpdateManagerDto } from './dto/update-manager.dto.js';
import { Manager } from './entities/manager.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find({
      relations: {
        location: true,
      },
    });
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOne({
      where: {
        managerId: id,
      },
      relations: {
        location: true,
      },
    });
    if (!manager) throw new NotFoundException(`Manager with id ${id} not found`);
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const newManager = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
    });

    if (!newManager) throw new NotFoundException(`Manager with id ${id} not found`);
    return this.managerRepository.save(newManager);
  }

  async remove(id: string) {
    const manager = await this.findOne(id);
    return await this.managerRepository.remove(manager);
  }
}
