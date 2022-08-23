import { Test } from '@nestjs/testing';

import type { Singer } from '@prisma/client';

import { DeleteSingersService } from 'api/admin/singers/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('DeleteSingersService', () => {
  let deleteSingersService: DeleteSingersService;
  let singer: Singer;

  beforeAll(async () => {
    singer = await prisma.singer.create({
      data: {
        name: 'Singer 1',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [DeleteSingersService],
    }).compile();

    deleteSingersService = test.get<DeleteSingersService>(DeleteSingersService);
  });

  it('should be defined', () => {
    expect(deleteSingersService).toBeDefined();
  });

  describe('service delete', () => {
    it('returns deleted singer detail', async () => {
      expect(await deleteSingersService.delete(singer.id)).toStrictEqual(
        singer,
      );
    });
  });
});
