import { Test } from '@nestjs/testing';

import type { Song } from '@prisma/client';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';
import { GetAllSingersService } from 'api/admin/singers/services';
import { GetAllAuthorsService } from 'api/admin/authors/services';
import { GetAllGenresService } from 'api/admin/genres/services';
import { UpdateSongsService } from 'api/admin/songs/services';

describe('UpdateSongsService', () => {
  let updateSongsService: UpdateSongsService;
  let song: Song;

  beforeAll(async () => {
    song = await prisma.song.create({
      data: {
        name: 'Song 1',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UpdateSongsService,
        GetAllSingersService,
        GetAllAuthorsService,
        GetAllGenresService,
        AdjustNumberSongsService,
      ],
    }).compile();

    updateSongsService = test.get<UpdateSongsService>(UpdateSongsService);
  });

  it('should be defined', () => {
    expect(updateSongsService).toBeDefined();
  });

  describe('service update', () => {
    it('returns updated song detail', async () => {
      expect(
        await updateSongsService.update(song.id, { name: 'Song 3', view: 0 }),
      );
    });
  });
});
