import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeesService {
  private employees : CreateEmployeeDto[] =  [{
    id: uuid(),
    name: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890'
  },
  {
    id: uuid(),
    name: 'Jane',
    lastName: 'Smith',
    phoneNumber: '0987654321'
  }
];
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    console.log('Creating employee:', createEmployeeDto);
    this.employees.push(createEmployeeDto); 
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find(employee => employee.id === id)
    if(!employee) throw new NotFoundException(`Employee with id ${id} not found`);
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employee: CreateEmployeeDto = this.findOne(id) as CreateEmployeeDto;
    if(!employee) throw new NotFoundException(`Employee with id ${id} not found`);

    employee = { ...employee, ...updateEmployeeDto };
    this.employees = this.employees.map(emp => emp.id === id ? employee : emp);
    return employee;  
  }

  remove(id: string) {
    const employeeToDelete = this.findOne(id);
    if(!employeeToDelete) throw new NotFoundException(`Employee with id ${id} not found`);
    
    this.employees = this.employees.filter(employee => employee.id !== employeeToDelete.id);
    return this.employees;
  }
}
