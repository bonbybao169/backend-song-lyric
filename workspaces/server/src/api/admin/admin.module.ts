import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import type { RouteTree } from '@nestjs/core';

import { SingersModule } from './singers/singers.module';
import { ProfileModule } from './profile/profile.module';
import { AuthorsModule } from './authors/authors.module';
import { GenresModule } from './genres/genres.module';
import { LyricsModule } from './lyrics/lyrics.module';
import { SongsModule } from './songs/songs.module';
import { AdminProfile } from './admin.profile';

@Module({
  imports: [
    ProfileModule,
    SongsModule,
    SingersModule,
    AuthorsModule,
    GenresModule,
    LyricsModule,
    JwtModule.register({}),
  ],
  providers: [AdminProfile],
})
export class AdminModule {}

export const adminRoutes: RouteTree = {
  path: 'admin',
  module: AdminModule,
  children: [
    ProfileModule,
    SongsModule,
    SingersModule,
    AuthorsModule,
    GenresModule,
    LyricsModule,
  ],
};
