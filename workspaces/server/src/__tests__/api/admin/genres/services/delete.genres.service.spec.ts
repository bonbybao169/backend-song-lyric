import { Test } from '@nestjs/testing';

import type { Genre } from '@prisma/client';

import { DeleteGenresService } from 'api/admin/genres/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('DeleteGenresService', () => {
  let deleteGenresService: DeleteGenresService;
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
      providers: [DeleteGenresService],
    }).compile();

    deleteGenresService = test.get<DeleteGenresService>(DeleteGenresService);
  });

  it('should be defined', () => {
    expect(deleteGenresService).toBeDefined();
  });

  describe('service delete', () => {
    it('returns deleted Genre detail', async () => {
      expect(await deleteGenresService.delete(genre.id)).toStrictEqual(genre);
    });
  });
});
