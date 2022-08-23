import { Controller, Body, Post, Param, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import interpole from 'string-interpolation-js';

import type { Lyric } from '@prisma/client';

import { GetEmailAdminService } from 'users/getEmailAdmin.service';
import { UseMapperInterceptor } from 'commons/interceptors/MapperInterceptor';
import { sendMail } from 'commons/mailing/nodemailer';
import { Roles } from 'commons/decorator/roles.decorator';
import { LyricVM } from 'api/v1/lyrics/lyric.vm';

import { CreateLyricsService } from './services/create.lyrics.service';
import { UpdateLyricsService } from './services/update.lyrics.service';
import { CreateLyricDto } from './dtos/create.lyric.dto';
import { UpdateLyricDto } from './dtos/update.lyric.dto';

@Roles(Role.user)
@Controller('lyrics')
@UseMapperInterceptor(LyricVM, LyricVM)
export class LyricsController {
  constructor(
    private createLyricsService: CreateLyricsService,
    private updateLyricsService: UpdateLyricsService,
    private getEmailAdminService: GetEmailAdminService,
    private config: ConfigService,
  ) {}

  @Post()
  async create(@Body() dto: CreateLyricDto): Promise<Lyric> {
    const lyric = await this.createLyricsService.create(dto);
    const message =
      '<h4>A new lyric with ID :id has been added. Go to :page to check</h4>';

    const emailAdminList = (
      await this.getEmailAdminService.getEmailAdmin()
    ).map((e) => e.email);

    sendMail({
      to: emailAdminList.toString(),
      subject: 'Add new lyric',
      html: interpole(message, {
        id: lyric.id,
        page: this.config.get('ADMIN_PAGE_URL'),
      }),
    });

    return lyric;
  }

  @Post('draft')
  createDraft(@Body() dto: CreateLyricDto): Promise<Lyric> {
    return this.createLyricsService.create(dto, 'draft');
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateLyricDto) {
    return this.updateLyricsService.update(id, dto);
  }
}
