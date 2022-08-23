import { Test } from '@nestjs/testing';

import type { Singer } from '@prisma/client';

import { GetAllSingersService } from 'api/admin/singers/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('GetAllSingersService', () => {
  let getAllSingersService: GetAllSingersService;
  let singer: Singer;
  let singer2: Singer;

  beforeAll(async () => {
    singer = await prisma.singer.create({
      data: {
        name: 'Singer 1',
      },
    });

    singer2 = await prisma.singer.create({
      data: {
        name: 'Singer 2',
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetAllSingersService],
    }).compile();

    getAllSingersService = test.get<GetAllSingersService>(GetAllSingersService);
  });

  it('should be defined', () => {
    expect(getAllSingersService).toBeDefined();
  });

  describe('service getAll', () => {
    it('returns list Singers', async () => {
      const singerList: Singer[] = [singer, singer2];

      expect(
        await getAllSingersService.getAll({ skip: 0, take: 5 }),
      ).toStrictEqual(singerList);
    });
  });
});
