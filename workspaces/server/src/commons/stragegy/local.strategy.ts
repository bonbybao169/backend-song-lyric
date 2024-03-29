import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { User } from '@prisma/client';

import { AuthService } from 'api/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
