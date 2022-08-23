import { Module } from '@nestjs/common';

import { AdjustNumberSongsService } from 'services/AdjustNumberSongsService';
import { GetTotalQuantityService } from 'services/GetTotalQuantityService';

import { AuthorsController } from './authors.controller';
import {
  GetAuthorsService,
  GetAllAuthorsService,
  UpdateAuthorsService,
  DeleteAuthorsService,
  CreateAuthorsService,
} from './services';

@Module({
  imports: [],
  providers: [
    GetAuthorsService,
    GetAllAuthorsService,
    UpdateAuthorsService,
    DeleteAuthorsService,
    CreateAuthorsService,
    GetTotalQuantityService,
    AdjustNumberSongsService,
  ],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
