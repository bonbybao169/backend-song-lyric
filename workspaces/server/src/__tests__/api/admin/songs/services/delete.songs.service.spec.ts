import { Test } from '@nestjs/testing';

import type { Song } from '@prisma/client';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { DeleteSongsService } from 'api/admin/songs/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('DeleteSongsService', () => {
  let deleteSongsService: DeleteSongsService;
  let song: Song;

  beforeAll(async () => {
    song = await prisma.song.create({
      data: {
        name: 'Song',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [DeleteSongsService, AdjustNumberSongsService],
    }).compile();

    deleteSongsService = test.get<DeleteSongsService>(DeleteSongsService);
  });

  it('should be defined', () => {
    expect(deleteSongsService).toBeDefined();
  });

  describe('service delete', () => {
    it('returns deleted song detail', async () => {
      expect(await deleteSongsService.delete(song.id)).toStrictEqual([
        { count: 0 },
        { count: 0 },
        { count: 0 },
        song,
      ]);
    });
  });
});
