import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @MaxLength(100)
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
}
