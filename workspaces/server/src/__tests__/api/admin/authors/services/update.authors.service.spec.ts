import { Test } from '@nestjs/testing';

import type { Author } from '@prisma/client';

import { UpdateAuthorsService } from 'api/admin/authors/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('UpdateAuthorsService', () => {
  let updateAuthorsService: UpdateAuthorsService;
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
      providers: [UpdateAuthorsService],
    }).compile();

    updateAuthorsService = test.get<UpdateAuthorsService>(UpdateAuthorsService);
  });

  it('should be defined', () => {
    expect(updateAuthorsService).toBeDefined();
  });

  describe('service update', () => {
    it('returns updated author detail', async () => {
      expect(
        await updateAuthorsService.update(author.id, {
          name: 'Author 3',
          numberOfSongs: 3,
        }),
      );
    });
  });
});
