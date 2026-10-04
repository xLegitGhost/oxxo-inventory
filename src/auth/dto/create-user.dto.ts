import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ default: 'user@gmail.com' })
    @IsString()
    @IsEmail()
    @MaxLength(100)
    userEmail: string;

    @ApiProperty({ default: 'password123' })
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiPropertyOptional({ default: 'employee' })
    @IsOptional()
    @IsIn(['admin', 'employee', 'manager'])
    userRoles?: string[];
}
