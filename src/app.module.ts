import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';
import { ProvidersModule } from './providers/providers.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RegionsModule } from './regions/regions.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EmployeesModule,
    ProductsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.dbHost ?? process.env.host ?? 'localhost',
      port: process.env.dbPort ? parseInt(process.env.dbPort, 10) : 5432,
      username: 'postgres',
      password: String(process.env.dbPass ?? '1234'),
      database: process.env.dbName ?? 'ocsoDB',
      entities: [],
      autoLoadEntities: true,
      synchronize: true
    }),
    ProvidersModule,
    ManagersModule,
    LocationsModule,
    RegionsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
