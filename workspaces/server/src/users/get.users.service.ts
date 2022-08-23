import { Injectable } from '@nestjs/common';

import type { User } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetUsersService {
  constructor(private prisma: PrismaService) {}

  get(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
