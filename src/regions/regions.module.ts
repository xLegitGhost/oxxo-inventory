import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service.js';
import { RegionsController } from './regions.controller.js';

@Module({
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
