import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service.js';
import { RegionsController } from './regions.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
