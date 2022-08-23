import { Test } from '@nestjs/testing';

import type { Genre } from '@prisma/client';

import { GetGenresService } from 'api/admin/genres/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetGenresService', () => {
  let getGenresService: GetGenresService;
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
      providers: [GetGenresService],
    }).compile();

    getGenresService = test.get<GetGenresService>(GetGenresService);
  });

  it('should be defined', () => {
    expect(getGenresService).toBeDefined();
  });

  describe('service get', () => {
    it('returns genre detail', async () => {
      expect(await getGenresService.get(genre.id)).toStrictEqual(genre);
    });
  });
});
