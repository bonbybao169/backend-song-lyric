import { Injectable } from '@nestjs/common';

import type { Singer } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetSingersService {
  constructor(private prisma: PrismaService) {}

  get(id: number): Promise<Singer> {
    return this.prisma.singer.findUnique({
      where: {
        id,
      },
    });
  }
}
