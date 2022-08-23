import { Injectable } from '@nestjs/common';

import type { Lyric } from '@prisma/client';

import { SongUnexistingException } from 'commons/filters/exceptions/songs/SongUnexistingException';
import { UserUnexistingException } from 'commons/filters/exceptions/auth';
import { PrismaService } from 'commons/prisma/prisma.service';
import { GetSongsService } from 'api/admin/songs/services';
import { CreateLyricDto } from 'api/v1/lyrics/dtos/create.lyric.dto';
import { GetUsersService } from 'users/get.users.service';

@Injectable()
export class CreateLyricsService {
  constructor(
    private prisma: PrismaService,
    private getSongsService: GetSongsService,
    private getUsersService: GetUsersService,
  ) {}

  async create(dto: CreateLyricDto): Promise<Lyric> {
    const availableSong = await this.getSongsService.get(dto.songId);

    if (!availableSong) {
      throw new SongUnexistingException();
    }

    const availableTranslator = await this.getUsersService.get(
      dto.translatorId,
    );

    if (!availableTranslator) {
      throw new UserUnexistingException();
    }

    return this.prisma.lyric.create({ data: dto });
  }
}
