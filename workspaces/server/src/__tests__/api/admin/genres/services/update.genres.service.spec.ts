import { Test } from '@nestjs/testing';

import type { Genre } from '@prisma/client';

import {
  GetGenresService,
  UpdateGenresService,
} from 'api/admin/genres/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('UpdateGenresService', () => {
  let updateGenresService: UpdateGenresService;
  let genre: Genre;

  beforeAll(async () => {
    genre = await prisma.genre.create({
      data: {
        name: 'Genre 1',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetGenresService, UpdateGenresService],
    }).compile();

    updateGenresService = test.get<UpdateGenresService>(UpdateGenresService);
  });

  it('should be defined', () => {
    expect(updateGenresService).toBeDefined();
  });

  describe('service update', () => {
    it('returns updated genre detail', async () => {
      expect(
        await updateGenresService.update(genre.id, {
          name: 'Genre 3',
          numberOfSongs: 3,
        }),
      );
    });
  });
});
