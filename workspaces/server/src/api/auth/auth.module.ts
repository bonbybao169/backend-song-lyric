import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import {
  FacebookStrategy,
  GoogleStrategy,
  JwtStrategy,
  LocalStrategy,
} from 'commons/stragegy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthProfile } from './auth.profile';

@Module({
  imports: [JwtModule.register({}), ConfigModule, PassportModule],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    FacebookStrategy,
    AuthProfile,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
