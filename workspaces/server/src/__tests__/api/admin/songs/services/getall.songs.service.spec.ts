import { Test } from '@nestjs/testing';

import type { Song } from '@prisma/client';

import { GetAllSongsService } from 'api/admin/songs/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetAllSongsService', () => {
  let getAllSongsService: GetAllSongsService;
  let song: Song;
  let song2: Song;

  beforeAll(async () => {
    song = await prisma.song.create({
      data: {
        name: 'Song 1',
      },
    });

    song2 = await prisma.song.create({
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
      const songList: Song[] = [song, song2];

      expect(await getAllSongsService.getAll(0, 5)).toStrictEqual(songList);
    });
  });
});
