import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import type { User } from '@prisma/client';

import {
  FailLoginException,
  UserExistedException,
} from 'commons/filters/exceptions/auth';
import { PrismaService } from 'commons/prisma/prisma.service';

import type { IDataWithMetadata, IToken } from 'interface';

import { AuthDto } from './auth.dto';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto): Promise<IDataWithMetadata> {
    const available = await this.findUserByEmail(dto.email);

    if (available) {
      throw new UserExistedException();
    }

    const hashPassword = await hash(dto.password, saltRounds);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashPassword,
        role: 'user',
        firstName: '',
        lastName: '',
        numberOfUploads: 0,
      },
    });

    const token = await this.signToken(user.id, user.email);

    return { data: user, metadata: token };
  }

  async login(user: User): Promise<IDataWithMetadata> {
    const token = await this.signToken(user.id, user.email);

    return { data: user, metadata: token };
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.findUserByEmail(username);

    if (!user) {
      throw new FailLoginException();
    }

    const checkPw = await compare(pass, user.password);

    if (!checkPw) {
      throw new FailLoginException();
    }

    return user;
  }

  async signToken(userId: number, email: string): Promise<IToken> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_ACCESS_TOKEN_SECRET');
    const expirationTime = this.config.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
    const refreshExpirationTime = this.config.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: expirationTime,
        secret: secret,
      }),
      this.jwt.signAsync(payload, {
        expiresIn: refreshExpirationTime,
        secret: secret,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async findUserByEmail(userEmail: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return user;
  }
}
