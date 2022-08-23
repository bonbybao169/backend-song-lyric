import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import {
  GoogleAuthGuard,
  FacebookAuthGuard,
  LocalAuthGuard,
} from 'commons/guard';
import { UseMapperInterceptor } from 'commons/interceptors/MapperInterceptor';
import { UserWithTokenVM } from 'users/users.vm';

import type { IDataWithMetadata } from 'interface';

import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@UseMapperInterceptor(UserWithTokenVM, UserWithTokenVM)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto): Promise<IDataWithMetadata> {
    const { data, metadata } = await this.authService.signup(dto);

    return { data, metadata };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<IDataWithMetadata> {
    const { data, metadata } = await this.authService.login(req.user);

    return { data, metadata };
  }

  @UseGuards(GoogleAuthGuard)
  @Post('google')
  async googleAuthPost(@Request() req): Promise<IDataWithMetadata> {
    const user = req.user;
    const token = await this.authService.signToken(user.id, user.email);

    return { data: user, metadata: token };
  }

  @UseGuards(FacebookAuthGuard)
  @Post('facebook')
  async facebookAuthPost(@Request() req): Promise<IDataWithMetadata> {
    const user = req.user;
    const token = await this.authService.signToken(user.id, user.email);

    return { data: user, metadata: token };
  }
}
