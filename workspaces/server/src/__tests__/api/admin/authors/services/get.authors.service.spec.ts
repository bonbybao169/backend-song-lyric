import { Test } from '@nestjs/testing';

import type { Author } from '@prisma/client';

import { GetAuthorsService } from 'api/admin/authors/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetAuthorsService', () => {
  let getAuthorsService: GetAuthorsService;
  let author: Author;

  beforeAll(async () => {
    author = await prisma.author.create({
      data: {
        name: 'Author 1',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetAuthorsService],
    }).compile();

    getAuthorsService = test.get<GetAuthorsService>(GetAuthorsService);
  });

  it('should be defined', () => {
    expect(getAuthorsService).toBeDefined();
  });

  describe('service get', () => {
    it('returns author detail', async () => {
      expect(await getAuthorsService.get(author.id)).toStrictEqual(author);
    });
  });
});
