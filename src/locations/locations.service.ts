import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity.js';
import { Manager } from '../managers/entities/manager.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    });
    if (!location) throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    // 1. Unlink previous manager assigned to this location
    await this.managerRepository
      .createQueryBuilder()
      .update(Manager)
      .set({ location: null as any })
      .where('locationId = :id', { id })
      .execute();

    // 2. Preload and save location
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!location) throw new NotFoundException();

    const savedLocation = await this.locationRepository.save(location);

    // 3. Link new manager if specified
    const managerId = (updateLocationDto as any).manager;
    if (managerId) {
      const updatedManager = await this.managerRepository.preload({
        managerId,
        location: savedLocation,
      });
      if (updatedManager) {
        await this.managerRepository.save(updatedManager);
      }
    }

    return savedLocation;
  }

  async remove(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    });
    if (!location) throw new NotFoundException();
    return this.locationRepository.remove(location);
  }
}
