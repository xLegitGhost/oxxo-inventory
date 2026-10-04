import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Location } from '../../locations/entities/location.entity.js';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  employeeName: string;

  @ApiProperty()
  @IsString()
  employeeLastName: string;

  @ApiProperty()
  @IsString()
  employeePhoneNumber: string;

  @ApiProperty()
  @IsEmail()
  employeeEmail: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  location?: Location;
}
