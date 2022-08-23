import * as Strategy from 'passport-facebook-token';

import type { Profile, VerifyCallback } from 'passport-facebook-token';

import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'commons/prisma/prisma.service';
import { AuthService } from 'api/auth/auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    config: ConfigService,
  ) {
    super({
      clientID: config.get('FACEBOOK_APP_ID'),
      clientSecret: config.get('FACEBOOK_APP_SECRET'),
      fbGraphVersion: 'v14.0',
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
        socialType: 'facebook',
      },
    });

    if (!socialLinked) {
      await this.prisma.socialsAuth.create({
        data: {
          userId: user.id,
          socialType: 'facebook',
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
