import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto);
  }

  @Post('login')
  signIn(@Body() createUserDto: CreateUserDto){
    return this.authService.loginUser(createUserDto);
  }

}
