import { Module } from '@nestjs/common';
import  { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [EmployeesModule, ProductsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host ?? "localhost",
    port: process.env.dbPort ? parseInt(process.env.dbPort) : 5432,
    username: "postgres",
    password: process.env.dbPass,
    database: process.env.dbName,
  }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
