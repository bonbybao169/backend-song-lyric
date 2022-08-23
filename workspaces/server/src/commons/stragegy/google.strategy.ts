import * as Strategy from 'passport-google-oauth-token';

import type { Profile, VerifyCallback } from 'passport-google-oauth-token';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'commons/prisma/prisma.service';
import { AuthService } from 'api/auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_SECRET'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { emails, name } = profile;

    let user = await this.authService.findUserByEmail(emails[0].value);

    if (!user) {
      await this.prisma.user.create({
        data: {
          email: emails[0].value,
          password: '',
          firstName: name.familyName,
          lastName: name.givenName,
          numberOfUploads: 0,
        },
      });

      user = await this.authService.findUserByEmail(emails[0].value);
    } else {
      await this.prisma.user.update({
        where: {
          email: emails[0].value,
        },
        data: {
          firstName: name.familyName,
          lastName: name.givenName,
        },
      });
    }

    const socialLinked = await this.prisma.socialsAuth.findFirst({
      where: {
        userId: user.id,
        socialType: 'google',
      },
    });

    if (!socialLinked) {
      await this.prisma.socialsAuth.create({
        data: {
          userId: user.id,
          socialType: 'google',
        },
      });
    }

    const result = await this.prisma.user.findFirst({
      where: {
        email: emails[0].value,
      },
    });
    done(null, result);
  }
}
