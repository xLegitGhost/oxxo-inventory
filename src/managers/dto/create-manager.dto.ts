import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Location } from "../../locations/entities/location.entity.js";

export class CreateManagerDto {
    @ApiProperty()
    @IsNumber()
    managerSalary: number;

    @ApiProperty()
    @IsString()
    @MaxLength(150)
    managerFullName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    @IsEmail()
    managerEmail: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    location?: Location;
}
