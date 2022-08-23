import {
  Controller,
  Get,
  Param,
  Query,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';

import type { Song } from '@prisma/client';
import type { Cache } from 'cache-manager';

import { IncreaseViewSongService, GetTotalQuantityService } from 'services';
import {
  UseLocalMapperInterceptor,
  UseMapperInterceptor,
} from 'commons/interceptors/MapperInterceptor';
import { SongUnexistingException } from 'commons/filters/exceptions/songs/SongUnexistingException';
import {
  SongPaginationVM,
  SongVM,
  SongWithAllAssociationVM,
} from 'api/v1/songs/song.vm';
import { getPageNumberAndLimit } from 'utils/pagy';

import type { IDataWithMetadata, IPagination } from 'interface';

import { GetSongsService, GetAllSongsService } from './services';

@Controller('songs')
@UseMapperInterceptor(SongVM, SongWithAllAssociationVM)
export class SongsController {
  constructor(
    private getSongsService: GetSongsService,
    private getAllSongsService: GetAllSongsService,
    private increaseViewSong: IncreaseViewSongService,
    private getTotalQuantityService: GetTotalQuantityService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseLocalMapperInterceptor(SongPaginationVM, SongPaginationVM)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
  ): Promise<IDataWithMetadata> {
    const [pageNumber, take, offset] = getPageNumberAndLimit(page, limit);

    const [totalRecord, songs] = await Promise.all([
      this.getTotalQuantityService.exec('song', search),
      this.getAllSongsService.getAll(offset, take, search),
    ]);

    const pagination: IPagination = {
      totalRecord,
      currentPage: pageNumber,
      recordsPerPage: take,
    };

    return { data: songs, metadata: pagination };
  }

  @Get(':id')
  async get(@Param('id') id: number, @RealIP() ip: string): Promise<Song> {
    const song = await this.getSongsService.get(id);

    if (!song) {
      throw new SongUnexistingException();
    }

    const cacheIp = await this.cacheManager.get(`clientIp${ip}`);

    if (!cacheIp) {
      Promise.all([
        this.increaseViewSong.exec(id),
        this.cacheManager.set(`clientIp${ip}`, ip, { ttl: 300 }),
      ]);
    }

    return song;
  }
}
