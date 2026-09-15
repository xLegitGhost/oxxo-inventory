import { IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeDto {
    @IsUUID('4')
    id: string;
    @IsString()
    name: string;
    @IsString()
    lastName: string;
    @IsPhoneNumber()
    phoneNumber: string;
}
