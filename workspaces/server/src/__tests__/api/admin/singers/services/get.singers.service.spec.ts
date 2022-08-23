import { Test } from '@nestjs/testing';

import type { Singer } from '@prisma/client';

import { GetSingersService } from 'api/admin/singers/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetSingersService', () => {
  let getSingersService: GetSingersService;
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
      providers: [GetSingersService],
    }).compile();

    getSingersService = test.get<GetSingersService>(GetSingersService);
  });

  it('should be defined', () => {
    expect(getSingersService).toBeDefined();
  });

  describe('service get', () => {
    it('returns singer detail', async () => {
      expect(await getSingersService.get(singer.id)).toStrictEqual(singer);
    });
  });
});
