import { Test } from '@nestjs/testing';

import type { Genre } from '@prisma/client';

import { GetAllGenresService } from 'api/admin/genres/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetAllGenresService', () => {
  let getAllGenresService: GetAllGenresService;
  let genre: Genre;
  let genre2: Genre;

  beforeAll(async () => {
    genre = await prisma.genre.create({
      data: {
        name: 'Genre 1',
      },
    });

    genre2 = await prisma.genre.create({
      data: {
        name: 'Genre 2',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetAllGenresService],
    }).compile();

    getAllGenresService = test.get<GetAllGenresService>(GetAllGenresService);
  });

  it('should be defined', () => {
    expect(getAllGenresService).toBeDefined();
  });

  describe('service getAll', () => {
    it('returns list genres', async () => {
      const genreList: Genre[] = [genre, genre2];

      expect(
        await getAllGenresService.getAll({ skip: 0, take: 5 }),
      ).toStrictEqual(genreList);
    });
  });
});
