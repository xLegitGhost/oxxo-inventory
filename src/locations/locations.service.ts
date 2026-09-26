import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto.js';
import { UpdateLocationDto } from './dto/update-location.dto.js';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {

  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ){}


  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findAndCountBy({
      locationId: id
    })
    if(!location) throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const newLocation = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    })

    if(!newLocation) throw new NotFoundException();

    return this.locationRepository.save(newLocation);
  }

  async remove(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id
    })
    if(!location) throw new NotFoundException();
    return this.locationRepository.remove(location);
  }
}
