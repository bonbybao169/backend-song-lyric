import { Module } from '@nestjs/common';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { GetTotalQuantityService } from 'services/GetTotalQuantityService';

import { GenresController } from './genres.controller';
import {
  GetGenresService,
  GetAllGenresService,
  DeleteGenresService,
  UpdateGenresService,
  CreateGenresService,
} from './services';

@Module({
  imports: [],
  providers: [
    GetGenresService,
    GetAllGenresService,
    DeleteGenresService,
    UpdateGenresService,
    CreateGenresService,
    GetTotalQuantityService,
    AdjustNumberSongsService,
  ],
  controllers: [GenresController],
})
export class GenresModule {}
