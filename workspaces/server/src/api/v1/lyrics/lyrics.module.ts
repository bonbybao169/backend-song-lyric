import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { GetEmailAdminService } from 'users/getEmailAdmin.service';
import { GetUsersService } from 'users/get.users.service';
import { GetSongsService } from 'api/v1/songs/services';
import { AuthService } from 'api/auth/auth.service';

import { CreateLyricsService } from './services/create.lyrics.service';
import { UpdateLyricsService } from './services/update.lyrics.service';
import { LyricsController } from './lyrics.controller';

@Module({
  imports: [],
  providers: [
    CreateLyricsService,
    UpdateLyricsService,
    GetUsersService,
    GetSongsService,
    GetEmailAdminService,
    JwtService,
    ConfigService,
    AuthService,
  ],
  controllers: [LyricsController],
})
export class LyricsModule {}
