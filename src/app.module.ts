import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';

@Module({
  imports: [EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
