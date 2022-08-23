import { Test } from '@nestjs/testing';

import type { Song } from '@prisma/client';

import { PrismaModule } from 'commons/prisma/prisma.module';
import { GetSongsService } from 'api/v1/songs/services';
import { prisma } from '__tests__/__config__/prisma';

describe('GetSongsService', () => {
  let getSongsService: GetSongsService;
  let song: Song;

  beforeAll(async () => {
    song = await prisma.song.create({
      data: {
        name: 'Song 1',
      },
    });

    await prisma.song.create({
      data: {
        name: 'Song 2',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetSongsService],
    }).compile();

    getSongsService = test.get<GetSongsService>(GetSongsService);
  });

  it('should be defined', () => {
    expect(getSongsService).toBeDefined();
  });

  describe('service get', () => {
    it('returns song detail', async () => {
      expect(await getSongsService.get(song.id)).toStrictEqual({
        ...song,
        authorsSongs: [],
        genresSongs: [],
        singersSongs: [],
      });
    });
  });
});
