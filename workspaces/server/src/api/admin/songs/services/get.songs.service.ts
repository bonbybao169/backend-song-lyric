import { Injectable } from '@nestjs/common';

import { PrismaService } from 'commons/prisma/prisma.service';

import type { ISongWithAllAssociation } from 'interface/SongWithAllAssociation';

@Injectable()
export class GetSongsService {
  constructor(private prisma: PrismaService) {}

  get(id: number): Promise<ISongWithAllAssociation> {
    return this.prisma.song.findUnique({
      where: {
        id,
      },
      include: {
        singersSongs: {
          include: {
            singer: true,
          },
        },
        authorsSongs: {
          include: {
            author: true,
          },
        },
        genresSongs: {
          include: {
            genre: true,
          },
        },
      },
    });
  }
}
