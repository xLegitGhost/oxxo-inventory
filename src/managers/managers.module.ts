import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service.js';
import { ManagersController } from './managers.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
