import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service.js';
import { ManagersController } from './managers.controller.js';

@Module({
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
