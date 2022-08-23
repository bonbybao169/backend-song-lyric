import { Injectable } from '@nestjs/common';

import type { Genre } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class DeleteGenresService {
  constructor(private prisma: PrismaService) {}

  delete(id: number): Promise<Genre> {
    return this.prisma.genre.delete({
      where: {
        id,
      },
    });
  }
}
