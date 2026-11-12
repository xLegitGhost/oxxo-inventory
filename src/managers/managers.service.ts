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
    const dto: any = { ...createManagerDto };
    if (dto.location && (typeof dto.location === 'string' || typeof dto.location === 'number')) {
      dto.location = { locationId: +dto.location };
    }
    return this.managerRepository.save(dto);
  }

  findAll() {
    return this.managerRepository.find({
      relations: {
        location: true,
        user: true,
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
        user: true,
      },
    });
    if (!manager) throw new NotFoundException(`Manager with id ${id} not found`);
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const dto: any = { ...updateManagerDto };
    if (dto.location && (typeof dto.location === 'string' || typeof dto.location === 'number')) {
      dto.location = { locationId: +dto.location };
    }
    const newManager = await this.managerRepository.preload({
      managerId: id,
      ...dto,
    });

    if (!newManager) throw new NotFoundException(`Manager with id ${id} not found`);
    return this.managerRepository.save(newManager);
  }

  async remove(id: string) {
    const manager = await this.findOne(id);
    return await this.managerRepository.remove(manager);
  }
}
