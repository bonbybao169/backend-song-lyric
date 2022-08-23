import { Test } from '@nestjs/testing';
import { Lyric } from '@prisma/client';
import { hash } from 'bcrypt';

import { UpdateLyricsService } from 'api/admin/lyrics/services/update.lyrics.service';
import { GetSongsService } from 'api/admin/songs/services';
import { GetUsersService } from 'users/get.users.service';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { prisma } from '__tests__/__config__/prisma';

describe('UpdateLyricsService', () => {
  let updateLyricsService: UpdateLyricsService;
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

    lyric = await prisma.lyric.create({
      data: {
        songId: 1,
        languageCode: 'vi',
        translatorId: 1,
        content: 'aaa',
        default: true,
      },
    });
  });

  beforeAll(async () => {
    const test = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [GetSongsService, GetUsersService, UpdateLyricsService],
    }).compile();

    updateLyricsService = test.get<UpdateLyricsService>(UpdateLyricsService);
  });

  it('should be defined', () => {
    expect(updateLyricsService).toBeDefined();
  });

  describe('service update', () => {
    it('returns updated lyric detail', async () => {
      expect(
        await updateLyricsService.update(lyric.id, {
          content: 'hihi',
        }),
      );
    });
  });
});
