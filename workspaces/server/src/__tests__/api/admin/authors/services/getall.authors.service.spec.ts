import { Test } from '@nestjs/testing';

import type { Author } from '@prisma/client';

import { GetAllAuthorsService } from 'api/admin/authors/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetAllAuthorsService', () => {
  let getAllAuthorsService: GetAllAuthorsService;
  let author: Author;
  let author2: Author;

  beforeAll(async () => {
    author = await prisma.author.create({
      data: {
        name: 'Author 1',
      },
    });

    author2 = await prisma.author.create({
      data: {
        name: 'Author 2',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetAllAuthorsService],
    }).compile();

    getAllAuthorsService = test.get<GetAllAuthorsService>(GetAllAuthorsService);
  });

  it('should be defined', () => {
    expect(getAllAuthorsService).toBeDefined();
  });

  describe('service getAll', () => {
    it('returns list authors', async () => {
      const authorList: Author[] = [author, author2];

      expect(
        await getAllAuthorsService.getAll({ skip: 0, take: 5 }),
      ).toStrictEqual(authorList);
    });
  });
});
