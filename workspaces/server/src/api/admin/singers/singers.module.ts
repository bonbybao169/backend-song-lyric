import { Module } from '@nestjs/common';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { GetTotalQuantityService } from 'services/GetTotalQuantityService';

import { SingersController } from './singers.controller';
import {
  CreateSingersService,
  GetSingersService,
  GetAllSingersService,
  UpdateSingersService,
  DeleteSingersService,
} from './services';

@Module({
  imports: [],
  providers: [
    CreateSingersService,
    GetSingersService,
    GetAllSingersService,
    UpdateSingersService,
    DeleteSingersService,
    GetTotalQuantityService,
    AdjustNumberSongsService,
  ],
  controllers: [SingersController],
})
export class SingersModule {}
