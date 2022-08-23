import { Test } from '@nestjs/testing';

import type { Author } from '@prisma/client';

import { DeleteAuthorsService } from 'api/admin/authors/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('DeleteAuthorsService', () => {
  let deleteAuthorsService: DeleteAuthorsService;
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
      providers: [DeleteAuthorsService],
    }).compile();

    deleteAuthorsService = test.get<DeleteAuthorsService>(DeleteAuthorsService);
  });

  it('should be defined', () => {
    expect(deleteAuthorsService).toBeDefined();
  });

  describe('service delete', () => {
    it('returns deleted author detail', async () => {
      expect(await deleteAuthorsService.delete(author.id)).toStrictEqual(
        author,
      );
    });
  });
});
