import { Injectable } from '@nestjs/common';

import type { Prisma, PrismaPromise, Author } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetAllAuthorsService {
  constructor(private prisma: PrismaService) {}

  getAll(option: Prisma.AuthorFindManyArgs = null): PrismaPromise<Author[]> {
    return this.prisma.author.findMany(option);
  }
}
