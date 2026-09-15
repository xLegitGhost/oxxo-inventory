import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
  @IsUUID('4')
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  email: string;
}
