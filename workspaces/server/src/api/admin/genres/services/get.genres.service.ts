import { Injectable } from '@nestjs/common';

import type { Genre } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetGenresService {
  constructor(private prisma: PrismaService) {}

  get(id: number): Promise<Genre> {
    return this.prisma.genre.findUnique({
      where: {
        id,
      },
    });
  }

  getByName(name: string) {
    return this.prisma.genre.findFirst({
      where: {
        name,
      },
    });
  }
}
