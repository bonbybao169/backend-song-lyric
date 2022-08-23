import { Injectable } from '@nestjs/common';

import type { Song } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetAllSongsService {
  constructor(private prisma: PrismaService) {}

  async getAll(offset: number, limit: number): Promise<Song[]> {
    return this.prisma.song.findMany({
      skip: offset,
      take: limit,
    });
  }
}
