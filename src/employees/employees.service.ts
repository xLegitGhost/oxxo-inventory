import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';

@Injectable()
export class EmployeesService {
  private employees : CreateEmployeeDto[] =  [{
    id: 1,
    name: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890'
  },
  {
    id: 2,
    name: 'Jane',
    lastName: 'Smith',
    phoneNumber: '0987654321'
  }
];
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length+1;
    console.log('Creating employee:', createEmployeeDto);
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return this.employees.find(employee => employee.id === id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    let employee: CreateEmployeeDto = this.findOne(id) as CreateEmployeeDto;
    employee = { ...employee, ...updateEmployeeDto };

    this.employees = this.employees.map(emp => emp.id === id ? employee : emp);
    return employee;  
  }

  remove(id: number) {
    this.employees = this.employees.filter(employee => employee.id !== id);
    return this.employees;
  }
}
