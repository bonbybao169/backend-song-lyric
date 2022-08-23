import { Injectable } from '@nestjs/common';

import type { Author } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class DeleteAuthorsService {
  constructor(private prisma: PrismaService) {}

  delete(id: number): Promise<Author> {
    return this.prisma.author.delete({
      where: {
        id,
      },
    });
  }
}
