import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ default: 'user@gmail.com' })
  @IsString()
  @IsEmail()
  userEmail: string;

  @ApiProperty({ default: 'password123' })
  @IsString()
  @MinLength(8)
  userPassword: string;
}
