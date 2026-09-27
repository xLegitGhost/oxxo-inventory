import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto.js';
import { UpdateRegionDto } from './dto/update-region.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {

  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region> 
  ){}


  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findBy({
      regionId: id
    })
    if(!region) throw new NotFoundException();
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const newRegion = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto
    })

    if(!newRegion) throw new NotFoundException();

    return this.regionRepository.save(newRegion);
  }

  async remove(id: number) {
    return await this.regionRepository.delete({
      regionId: id
    })
  }
}
