import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AuthService } from 'api/auth/auth.service';

import { ProfileController } from './profile.controller';

@Module({
  imports: [],
  providers: [AuthService, JwtService, ConfigService],
  controllers: [ProfileController],
})
export class ProfileModule {}
