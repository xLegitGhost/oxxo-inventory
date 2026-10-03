import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service.js';
import { ProvidersController } from './providers.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from '../auth/constants/jwt.constants.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Provider]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: EXPIRES_IN },
    }),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}
