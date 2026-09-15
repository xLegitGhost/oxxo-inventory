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
    const employee = this.employeeRepository.create(createEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto,
    });
    if (!employee) throw new NotFoundException(`Employee with id ${id} not found`);
    return await this.employeeRepository.save(employee);
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    return await this.employeeRepository.remove(employee);
  }
}
