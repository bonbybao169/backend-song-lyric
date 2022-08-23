import { Test } from '@nestjs/testing';

import type { Song } from '@prisma/client';

import { PrismaModule } from 'commons/prisma/prisma.module';
import { GetAllSongsService } from 'api/v1/songs/services';
import { prisma } from '__tests__/__config__/prisma';

describe('SongsService', () => {
  let getAllSongsService: GetAllSongsService;
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
      providers: [GetAllSongsService],
    }).compile();

    getAllSongsService = test.get<GetAllSongsService>(GetAllSongsService);
  });

  it('should be defined', () => {
    expect(getAllSongsService).toBeDefined();
  });

  describe('service getAll', () => {
    it('returns list songs', async () => {
      const songList: Song[] = [song];

      expect(await getAllSongsService.getAll(0, 5, '1')).toStrictEqual(
        songList,
      );
    });
  });
});
