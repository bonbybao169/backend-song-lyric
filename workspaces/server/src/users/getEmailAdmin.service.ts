import { Injectable } from '@nestjs/common';

import type { PrismaPromise } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

interface IEmail {
  email: string;
}

@Injectable()
export class GetEmailAdminService {
  constructor(private prisma: PrismaService) {}

  getEmailAdmin(): PrismaPromise<IEmail[]> {
    return this.prisma.user.findMany({
      where: {
        role: 'admin',
      },
      select: {
        email: true,
      },
    });
  }
}
