import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';

import type { Lyric } from '@prisma/client';

import { CreateLyricsService } from 'api/v1/lyrics/services/create.lyrics.service';
import { GetSongsService } from 'api/v1/songs/services';
import { GetUsersService } from 'users/get.users.service';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('LyricsService', () => {
  let createLyricsService: CreateLyricsService;
  let lyric: Lyric;

  beforeAll(async () => {
    await prisma.song.create({
      data: {
        name: 'Song 1',
      },
    });

    await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        password: await hash('admin', 10),
        role: 'admin',
        firstName: 'Tran',
        lastName: 'Bevis',
        numberOfUploads: 0,
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [CreateLyricsService, GetSongsService, GetUsersService],
    }).compile();

    createLyricsService = test.get<CreateLyricsService>(CreateLyricsService);
  });

  it('should be defined', () => {
    expect(createLyricsService).toBeDefined();
  });

  describe('service create', () => {
    it('returns lyric deltail', async () => {
      const expectation = {
        content: 'aaa',
        default: true,
        id: 1,
        languageCode: 'vi',
        songId: 1,
        translatorId: 1,
        status: 'pending',
        createdAt: undefined,
        updatedAt: undefined,
      };

      lyric = await createLyricsService.create({
        songId: 1,
        languageCode: 'vi',
        translatorId: 1,
        content: 'aaa',
        default: true,
      });

      expect({
        ...lyric,
        createdAt: undefined,
        updatedAt: undefined,
      }).toStrictEqual(expectation);
    });
  });
});
