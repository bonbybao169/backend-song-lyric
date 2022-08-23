import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { GetUsersService } from 'users/get.users.service';
import { GetSongsService } from 'api/admin/songs/services';
import { AuthService } from 'api/auth/auth.service';

import { ConfirmLyricsService } from './services/confirm.lyrics.service';
import { CreateLyricsService } from './services/create.lyrics.service';
import { UpdateLyricsService } from './services/update.lyrics.service';
import { LyricsController } from './lyrics.controller';

@Module({
  imports: [],
  providers: [
    CreateLyricsService,
    UpdateLyricsService,
    ConfirmLyricsService,
    GetUsersService,
    GetSongsService,
    JwtService,
    ConfigService,
    AuthService,
  ],
  controllers: [LyricsController],
})
export class LyricsModule {}
