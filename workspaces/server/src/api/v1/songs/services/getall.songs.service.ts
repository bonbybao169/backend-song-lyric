import { Injectable } from '@nestjs/common';

import type { Prisma, Song } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetAllSongsService {
  constructor(private prisma: PrismaService) {}

  async getAll(offset: number, limit: number, search: string): Promise<Song[]> {
    let searchOption: Prisma.SongFindManyArgs = { skip: offset, take: limit };

    if (search) {
      const query = search.replace(/\s/g, ' & ');
      searchOption = {
        ...searchOption,
        where: {
          name: {
            search: query,
          },
        },
      };
    }

    return this.prisma.song.findMany(searchOption);
  }
}
