import { Injectable } from '@nestjs/common';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class DeleteSongsService {
  constructor(
    private prisma: PrismaService,
    private adjustNumberSongsService: AdjustNumberSongsService,
  ) {}

  async delete(id: number) {
    const [singersSongs, authorsSongs, genresSongs] = await Promise.all([
      this.prisma.singersSong.findMany({
        where: {
          songId: id,
        },
        select: {
          singerId: true,
        },
      }),
      this.prisma.authorsSong.findMany({
        where: {
          songId: id,
        },
        select: {
          authorId: true,
        },
      }),
      this.prisma.genresSong.findMany({
        where: {
          songId: id,
        },
        select: {
          genreId: true,
        },
      }),
    ]);

    // Singer
    const descreaseSingerNumSongs = this.adjustNumberSongsService.exec(
      'singer',
      'decrement',
      singersSongs.map((singer) => {
        return singer.singerId;
      }),
    );

    // Author
    const descreaseAuthorNumSongs = this.adjustNumberSongsService.exec(
      'author',
      'decrement',
      authorsSongs.map((author) => {
        return author.authorId;
      }),
    );

    // Genre
    const descreaseGenreNumSongs = this.adjustNumberSongsService.exec(
      'genre',
      'decrement',
      genresSongs.map((genre) => {
        return genre.genreId;
      }),
    );

    // Delete song
    const deleteSong = this.prisma.song.delete({
      where: {
        id,
      },
    });

    return this.prisma.$transaction([
      descreaseSingerNumSongs,
      descreaseAuthorNumSongs,
      descreaseGenreNumSongs,
      deleteSong,
    ]);
  }
}
