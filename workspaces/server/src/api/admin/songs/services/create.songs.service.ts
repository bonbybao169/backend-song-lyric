import { Injectable } from '@nestjs/common';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { GetAllSingersService } from 'api/admin/singers/services';
import { GetAllAuthorsService } from 'api/admin/authors/services';
import { GetAllGenresService } from 'api/admin/genres/services';
import { CreateSongDto } from 'api/admin/songs/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

import type { ISongWithAllAssociation } from 'interface/SongWithAllAssociation';

@Injectable()
export class CreateSongsService {
  constructor(
    private prisma: PrismaService,
    private getAllSingerService: GetAllSingersService,
    private getAllGenreService: GetAllGenresService,
    private getAllAuthorService: GetAllAuthorsService,
    private adjustNumberSongsService: AdjustNumberSongsService,
  ) {}

  async create({
    singers: singerIds = [],
    name,
    length,
    url,
    authors: authorIds = [],
    genres: genreIds = [],
  }: CreateSongDto): Promise<ISongWithAllAssociation> {
    const [singerList, authorList, genreList] = await Promise.all([
      this.getAllSingerService.getAll({
        where: {
          id: { in: singerIds },
        },
        select: {
          id: true,
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
      this.getAllGenreService.getAll({
        where: {
          id: { in: genreIds },
        },
        select: {
          id: true,
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

    const increaseSingerNumberSongs = this.adjustNumberSongsService.exec(
      'singer',
      'increment',
      singerIdList,
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

    const increaseAuthorNumberSongs = this.adjustNumberSongsService.exec(
      'author',
      'increment',
      authorIdList,
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

    const increaseGenreNumberSongs = this.adjustNumberSongsService.exec(
      'genre',
      'increment',
      genreIdList,
    );

    // create song
    const createSong = this.prisma.song.create({
      data: {
        name,
        length,
        url,
        singersSongs: {
          create: connectSinger,
        },
        authorsSongs: {
          create: connectAuthor,
        },
        genresSongs: {
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
      increaseSingerNumberSongs,
      increaseAuthorNumberSongs,
      increaseGenreNumberSongs,
      createSong,
    ]);

    return result[result.length - 1] as ISongWithAllAssociation;
  }
}
