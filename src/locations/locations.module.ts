import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service.js';
import { LocationsController } from './locations.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity.js';
import { Manager } from '../managers/entities/manager.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Manager])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
