import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ){}

  async registerUser(createUserDto: CreateUserDto) {
    const isEmailExist = await this.userRepository.findOneBy({
      userEmail: createUserDto.userEmail
    });

    if(isEmailExist) throw new ConflictException("Ya existe un usuario con ese correo")

    const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 10);
    const user = this.userRepository.create({
      userEmail: createUserDto.userEmail,
      userPassword: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async loginUser(loginUserDto: LoginUserDto){
    const user = await this.userRepository.findOneBy({
      userEmail: loginUserDto.userEmail,
    });

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const passwordMatches = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const payload = {
      userId: user.userId,
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles,
    };

    const token = this.jwtService.sign(payload);

    return token;
  }
}
