import { Injectable } from '@nestjs/common';

import type { Prisma, PrismaPromise, Genre } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetAllGenresService {
  constructor(private prisma: PrismaService) {}

  getAll(option: Prisma.GenreFindManyArgs = null): PrismaPromise<Genre[]> {
    return this.prisma.genre.findMany(option);
  }
}
