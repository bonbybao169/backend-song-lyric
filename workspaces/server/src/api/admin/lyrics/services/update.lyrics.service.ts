import { Injectable } from '@nestjs/common';

import type { Lyric } from '@prisma/client';

import { UserUnexistingException } from 'commons/filters/exceptions/auth';
import { SongUnexistingException } from 'commons/filters/exceptions/songs/SongUnexistingException';
import { PrismaService } from 'commons/prisma/prisma.service';
import { GetSongsService } from 'api/admin/songs/services';
import { UpdateLyricDto } from 'api/admin/lyrics/dtos/update.lyric.dto';
import { GetUsersService } from 'users/get.users.service';

@Injectable()
export class UpdateLyricsService {
  constructor(
    private prisma: PrismaService,
    private getSongsService: GetSongsService,
    private getUsersService: GetUsersService,
  ) {}

  async update(id: number, dto: UpdateLyricDto): Promise<Lyric> {
    if (dto.songId) {
      const availableSong = await this.getSongsService.get(dto.songId);

      if (!availableSong) {
        throw new SongUnexistingException();
      }
    }

    if (dto.translatorId) {
      const availableTranslator = await this.getUsersService.get(
        dto.translatorId,
      );

      if (!availableTranslator) {
        throw new UserUnexistingException();
      }
    }

    return this.prisma.lyric.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
