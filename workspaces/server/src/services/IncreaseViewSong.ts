import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import type { Song } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class IncreaseViewSongService {
  constructor(private prisma: PrismaService) {}

  public exec(id: number): Prisma.Prisma__SongClient<Song> {
    return this.prisma.song.update({
      where: {
        id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });
  }
}
