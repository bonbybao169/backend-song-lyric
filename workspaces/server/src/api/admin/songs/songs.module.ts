import { Module } from '@nestjs/common';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { GetTotalQuantityService } from 'services/GetTotalQuantityService';
import { GetAllSingersService } from 'api/admin/singers/services';
import { GetAllAuthorsService } from 'api/admin/authors/services';
import { GetAllGenresService } from 'api/admin/genres/services';

import { SongsController } from './songs.controller';
import {
  GetSongsService,
  GetAllSongsService,
  CreateSongsService,
  UpdateSongsService,
  DeleteSongsService,
} from './services';

@Module({
  imports: [],
  providers: [
    GetSongsService,
    GetAllSongsService,
    CreateSongsService,
    UpdateSongsService,
    DeleteSongsService,
    GetAllSingersService,
    GetAllGenresService,
    GetAllAuthorsService,
    AdjustNumberSongsService,
    GetTotalQuantityService,
  ],
  controllers: [SongsController],
})
export class SongsModule {}
