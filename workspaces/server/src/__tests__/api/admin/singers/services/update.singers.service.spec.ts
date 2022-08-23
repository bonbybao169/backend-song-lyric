import { Test } from '@nestjs/testing';

import type { Singer } from '@prisma/client';

import { UpdateSingersService } from 'api/admin/singers/services';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('UpdateSingersService', () => {
  let updateSingersService: UpdateSingersService;
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
      providers: [UpdateSingersService],
    }).compile();

    updateSingersService = test.get<UpdateSingersService>(UpdateSingersService);
  });

  it('should be defined', () => {
    expect(updateSingersService).toBeDefined();
  });

  describe('service update', () => {
    it('returns updated singer detail', async () => {
      expect(
        await updateSingersService.update(singer.id, {
          name: 'Singer 3',
          numberOfSongs: 3,
        }),
      );
    });
  });
});
