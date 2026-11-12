import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { Auth } from './decorators/auth.decorator.js';
import { ROLES } from './constants/roles.constants.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto);
  }

  @Auth(ROLES.MANAGER)
  @Post('register-employee/:id')
  registerEmployee(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.authService.registerEmployee(id, createUserDto);
  }

  @Auth(ROLES.ADMIN)
  @Post('register-manager/:id')
  registerManager(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    return this.authService.registerManager(id, createUserDto);
  }

  @Post('login')
  signIn(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Patch(':email')
  updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(email, updateUserDto);
  }
}
