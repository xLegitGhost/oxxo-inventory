import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

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

  async loginUser(createUserDto: CreateUserDto){
    const user = await this.userRepository.findOneBy({
      userEmail: createUserDto.userEmail,
    });

    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const passwordMatches = await bcrypt.compare(
      createUserDto.userPassword,
      user.userPassword,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        userEmail: user.userEmail,
      },
      'secret',
      { expiresIn: '1h' },
    );

    return token;
  }
}
