import { Module } from '@nestjs/common';

import type { RouteTree } from '@nestjs/core';

import { LyricsModule } from './lyrics/lyrics.module';
import { SongsModule } from './songs/songs.module';
import { V1Profile } from './v1.profile';

@Module({
  imports: [SongsModule, LyricsModule],
  providers: [V1Profile],
})
export class V1Module {}

export const v1Routes: RouteTree = {
  path: 'v1',
  module: V1Module,
  children: [SongsModule, LyricsModule],
};
