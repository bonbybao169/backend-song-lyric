import { CacheModule, Module } from '@nestjs/common';

import { IncreaseViewSongService, GetTotalQuantityService } from 'services';

import { GetSongsService, GetAllSongsService } from './services';
import { SongsController } from './songs.controller';

@Module({
  imports: [CacheModule.register()],
  providers: [
    GetSongsService,
    GetAllSongsService,
    IncreaseViewSongService,
    GetTotalQuantityService,
  ],
  controllers: [SongsController],
})
export class SongsModule {}
