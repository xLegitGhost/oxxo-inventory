import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Employee } from '../employees/entities/employee.entity.js';
import { Manager } from '../managers/entities/manager.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Employee) private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private readonly managerRepository: Repository<Manager>,
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
      userRoles: createUserDto.userRoles,
    });

    return this.userRepository.save(user);
  }

  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    const roles: string[] = Array.isArray(createUserDto.userRoles)
      ? createUserDto.userRoles
      : createUserDto.userRoles ? [createUserDto.userRoles as any] : [];

    if (roles.includes('admin') || roles.includes('manager')) {
      throw new BadRequestException('Rol inválido para empleado');
    }

    const user = await this.registerUser(createUserDto);

    const employee = await this.employeeRepository.preload({
      id,
      user,
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    return await this.employeeRepository.save(employee);
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    const roles: string[] = Array.isArray(createUserDto.userRoles)
      ? createUserDto.userRoles
      : createUserDto.userRoles ? [createUserDto.userRoles as any] : [];

    if (roles.includes('admin')) {
      throw new BadRequestException('Rol inválido para manager');
    }

    const user = await this.registerUser(createUserDto);

    const manager = await this.managerRepository.preload({
      managerId: id,
      user,
    });

    if (!manager) {
      throw new NotFoundException(`Manager with id ${id} not found`);
    }

    return await this.managerRepository.save(manager);
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

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto,
    });

    if (!newUserData) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }

    return this.userRepository.save(newUserData);
  }
}
