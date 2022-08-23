import { Injectable } from '@nestjs/common';

import type { Prisma, PrismaPromise, Singer } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetAllSingersService {
  constructor(private prisma: PrismaService) {}

  getAll(option: Prisma.SingerFindManyArgs = null): PrismaPromise<Singer[]> {
    return this.prisma.singer.findMany(option);
  }
}
