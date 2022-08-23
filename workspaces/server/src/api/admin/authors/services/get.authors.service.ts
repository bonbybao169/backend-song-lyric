import { Injectable } from '@nestjs/common';

import type { Author } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetAuthorsService {
  constructor(private prisma: PrismaService) {}

  get(id: number): Promise<Author> {
    return this.prisma.author.findUnique({
      where: {
        id,
      },
    });
  }
}
