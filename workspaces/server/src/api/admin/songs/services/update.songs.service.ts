import { Injectable } from '@nestjs/common';
import { difference } from 'lodash';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { GetAllSingersService } from 'api/admin/singers/services';
import { GetAllAuthorsService } from 'api/admin/authors/services';
import { GetAllGenresService } from 'api/admin/genres/services';
import { UpdateSongDto } from 'api/admin/songs/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

import type { ISongWithAllAssociation } from 'interface/SongWithAllAssociation';

@Injectable()
export class UpdateSongsService {
  constructor(
    private prisma: PrismaService,
    private getAllSingerService: GetAllSingersService,
    private getAllGenreService: GetAllGenresService,
    private getAllAuthorService: GetAllAuthorsService,
    private adjustNumberSongsService: AdjustNumberSongsService,
  ) {}

  async update(
    id: number,
    {
      singers: singerIds = [],
      name,
      length,
      url,
      view,
      authors: authorIds = [],
      genres: genreIds = [],
    }: UpdateSongDto,
  ): Promise<ISongWithAllAssociation> {
    const [
      singerList,
      singersSongs,
      authorList,
      authorsSongs,
      genreList,
      genresSongs,
    ] = await Promise.all([
      this.getAllSingerService.getAll({
        where: {
          id: { in: singerIds },
        },
        select: {
          id: true,
        },
      }),
      this.prisma.singersSong.findMany({
        where: {
          songId: id,
        },
        select: {
          singerId: true,
        },
      }),
      this.getAllAuthorService.getAll({
        where: {
          id: { in: authorIds },
        },
        select: {
          id: true,
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
      this.getAllGenreService.getAll({
        where: {
          id: { in: genreIds },
        },
        select: {
          id: true,
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
    const [singerIdList, connectSinger] = singerList.reduce<
      [number[], { singer: { connect: { id: number } } }[]]
    >(
      (result, singer) => {
        result[0].push(singer.id);
        result[1].push({
          singer: {
            connect: {
              id: singer.id,
            },
          },
        });

        return result;
      },
      [[], []],
    );

    let oldIds = singersSongs.map((singer) => {
      return singer.singerId;
    });

    const increaseSingerNumSongs = this.adjustNumberSongsService.exec(
      'singer',
      'increment',
      difference(singerIdList, oldIds),
    );

    const descreaseSingerNumSongs = this.adjustNumberSongsService.exec(
      'singer',
      'decrement',
      difference(oldIds, singerIdList),
    );

    // Author
    const [authorIdList, connectAuthor] = authorList.reduce<
      [number[], { author: { connect: { id: number } } }[]]
    >(
      (result, author) => {
        result[0].push(author.id);
        result[1].push({
          author: {
            connect: {
              id: author.id,
            },
          },
        });

        return result;
      },
      [[], []],
    );

    oldIds = authorsSongs.map((author) => {
      return author.authorId;
    });

    const increaseAuthorNumSongs = this.adjustNumberSongsService.exec(
      'author',
      'increment',
      difference(authorIdList, oldIds),
    );

    const descreaseAuthorNumSongs = this.adjustNumberSongsService.exec(
      'author',
      'decrement',
      difference(oldIds, authorIdList),
    );

    // Genre
    const [genreIdList, connectGenre] = genreList.reduce<
      [number[], { genre: { connect: { id: number } } }[]]
    >(
      (result, genre) => {
        result[0].push(genre.id);
        result[1].push({
          genre: {
            connect: {
              id: genre.id,
            },
          },
        });

        return result;
      },
      [[], []],
    );

    oldIds = genresSongs.map((genre) => {
      return genre.genreId;
    });

    const increaseGenreNumSongs = this.adjustNumberSongsService.exec(
      'genre',
      'increment',
      difference(genreIdList, oldIds),
    );

    const descreaseGenreNumSongs = this.adjustNumberSongsService.exec(
      'genre',
      'decrement',
      difference(oldIds, genreIdList),
    );

    // Update song
    const updateSong = this.prisma.song.update({
      where: {
        id,
      },
      data: {
        name,
        length,
        url,
        view,
        singersSongs: {
          deleteMany: singersSongs,
          create: connectSinger,
        },
        authorsSongs: {
          deleteMany: authorsSongs,
          create: connectAuthor,
        },
        genresSongs: {
          deleteMany: genresSongs,
          create: connectGenre,
        },
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

    const result = await this.prisma.$transaction([
      increaseSingerNumSongs,
      descreaseSingerNumSongs,
      increaseAuthorNumSongs,
      descreaseAuthorNumSongs,
      increaseGenreNumSongs,
      descreaseGenreNumSongs,
      updateSong,
    ]);

    return result[result.length - 1] as ISongWithAllAssociation;
  }
}
