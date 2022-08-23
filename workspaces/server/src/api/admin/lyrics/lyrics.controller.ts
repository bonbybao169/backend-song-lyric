import { Controller, Body, Post, Put, Param } from '@nestjs/common';
import { Role } from '@prisma/client';

import type { Lyric, Status } from '@prisma/client';

import { UseMapperInterceptor } from 'commons/interceptors/MapperInterceptor';
import { Roles } from 'commons/decorator/roles.decorator';
import { LyricVM } from 'api/v1/lyrics/lyric.vm';

import { UpdateLyricDto, CreateLyricDto } from './dtos';
import { CreateLyricsService } from './services/create.lyrics.service';
import { UpdateLyricsService } from './services/update.lyrics.service';
import { ConfirmLyricsService } from './services/confirm.lyrics.service';

@Roles(Role.admin)
@Controller('lyrics')
@UseMapperInterceptor(LyricVM, LyricVM)
export class LyricsController {
  constructor(
    private createLyricsService: CreateLyricsService,
    private updateLyricsService: UpdateLyricsService,
    private confirmLyricsService: ConfirmLyricsService,
  ) {}

  @Post()
  create(@Body() dto: CreateLyricDto): Promise<Lyric> {
    return this.createLyricsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateLyricDto) {
    return this.updateLyricsService.update(id, dto);
  }

  @Put(':id/:confirm(approved|rejected)')
  confirm(
    @Param('id') id: number,
    @Param('confirm') confirm: Status,
  ): Promise<Lyric> {
    return this.confirmLyricsService.confirm(id, confirm);
  }
}
