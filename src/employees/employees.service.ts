import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const dto: any = { ...createEmployeeDto };
    if (dto.location && (typeof dto.location === 'string' || typeof dto.location === 'number')) {
      dto.location = { locationId: +dto.location };
    }
    const employee = this.employeeRepository.create(dto as CreateEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find({
      relations: {
        location: true,
        user: true,
      },
    });
  }

  async findByLocation(id: number) {
    return await this.employeeRepository.find({
      where: {
        location: {
          locationId: id,
        },
      },
      relations: {
        location: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: {
        location: true,
        user: true,
      },
    });
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const dto: any = { ...updateEmployeeDto };
    if (dto.location && (typeof dto.location === 'string' || typeof dto.location === 'number')) {
      dto.location = { locationId: +dto.location };
    }
    if (dto.employeePhoto === undefined || dto.employeePhoto === '' || dto.employeePhoto === 'undefined') {
      delete dto.employeePhoto;
    }
    const employee = await this.employeeRepository.preload({
      id,
      ...dto,
    });
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);
    return await this.employeeRepository.save(employee);
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    return await this.employeeRepository.remove(employee);
  }
}
