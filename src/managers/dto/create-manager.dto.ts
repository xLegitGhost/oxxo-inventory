import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateManagerDto {
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(150)
    managerFullName: string;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @IsString()
    @MaxLength(100)
    @IsEmail()
    managerEmail: string;
}
