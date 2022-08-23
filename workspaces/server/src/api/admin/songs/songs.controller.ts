import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import type { Song } from '@prisma/client';

import { GetTotalQuantityService } from 'services';
import {
  UseLocalMapperInterceptor,
  UseMapperInterceptor,
} from 'commons/interceptors/MapperInterceptor';
import { SongUnexistingException } from 'commons/filters/exceptions/songs/SongUnexistingException';
import { StringVM } from 'commons/StringVM';
import { Roles } from 'commons/decorator/roles.decorator';
import { getPageNumberAndLimit } from 'utils/pagy';

import type {
  IDataWithMetadata,
  IPagination,
  IStringResponse,
} from 'interface';

import {
  GetSongsService,
  GetAllSongsService,
  CreateSongsService,
  UpdateSongsService,
  DeleteSongsService,
} from './services';
import { SongPaginationVM, SongVM, SongWithAllAssociationVM } from './song.vm';
import { CreateSongDto, UpdateSongDto } from './dtos';

@Roles(Role.admin)
@Controller('songs')
@UseMapperInterceptor(SongVM, SongWithAllAssociationVM)
export class SongsController {
  constructor(
    private getSongsService: GetSongsService,
    private updateSongsService: UpdateSongsService,
    private getAllSongsService: GetAllSongsService,
    private deleteSongsService: DeleteSongsService,
    private createSongsService: CreateSongsService,
    private getTotalQuantityService: GetTotalQuantityService,
  ) {}

  @Post()
  create(@Body() dto: CreateSongDto): Promise<Song> {
    return this.createSongsService.create(dto);
  }

  @UseLocalMapperInterceptor(SongPaginationVM, SongPaginationVM)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IDataWithMetadata> {
    const [pageNumber, take, offset] = getPageNumberAndLimit(page, limit);

    const [totalRecord, songs] = await Promise.all([
      this.getTotalQuantityService.exec('song'),
      this.getAllSongsService.getAll(offset, take),
    ]);

    const pagination: IPagination = {
      totalRecord,
      currentPage: pageNumber,
      recordsPerPage: take,
    };

    return { data: songs, metadata: pagination };
  }

  @Get(':id')
  async get(@Param('id') id: number): Promise<Song> {
    const song = await this.getSongsService.get(id);

    if (!song) {
      throw new SongUnexistingException();
    }

    return song;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSongDto,
  ): Promise<Song> {
    const song = await this.getSongsService.get(id);

    if (!song) {
      throw new SongUnexistingException();
    }

    return this.updateSongsService.update(id, dto);
  }

  @UseLocalMapperInterceptor(StringVM, StringVM)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<IStringResponse> {
    const song = await this.get(id);

    if (!song) {
      throw new SongUnexistingException();
    }

    await this.deleteSongsService.delete(id);

    return { data: `Song with ID ${id} has been deleted` };
  }
}
