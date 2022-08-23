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

import type { Genre } from '@prisma/client';

import { GetTotalQuantityService } from 'services';
import {
  UseLocalMapperInterceptor,
  UseMapperInterceptor,
} from 'commons/interceptors/MapperInterceptor';
import { GenreUnexistingException } from 'commons/filters/exceptions/genres';
import { StringVM } from 'commons/StringVM';
import { Roles } from 'commons/decorator/roles.decorator';
import { getPageNumberAndLimit } from 'utils/pagy';

import type {
  IDataWithMetadata,
  IPagination,
  IStringResponse,
} from 'interface';

import {
  GetGenresService,
  GetAllGenresService,
  UpdateGenresService,
  CreateGenresService,
  DeleteGenresService,
} from './services';
import { CreateGenreDto, UpdateGenreDto } from './dtos';
import { GenrePaginationVM, GenreVM } from './genre.vm';

@Roles(Role.admin)
@Controller('genres')
@UseMapperInterceptor(GenreVM, GenreVM)
export class GenresController {
  constructor(
    private getGenreService: GetGenresService,
    private getAllGenreService: GetAllGenresService,
    private updateGenreService: UpdateGenresService,
    private createGenreService: CreateGenresService,
    private deleteGenreService: DeleteGenresService,
    private getTotalQuantityService: GetTotalQuantityService,
  ) {}

  @Post()
  create(@Body() dto: CreateGenreDto): Promise<Genre> {
    return this.createGenreService.create(dto);
  }

  @UseLocalMapperInterceptor(GenrePaginationVM, GenrePaginationVM)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IDataWithMetadata> {
    const [pageNumber, take, offset] = getPageNumberAndLimit(page, limit);

    const [totalRecord, genres] = await Promise.all([
      this.getTotalQuantityService.exec('genre'),
      this.getAllGenreService.getAll({
        skip: offset,
        take,
      }),
    ]);

    const pagination: IPagination = {
      totalRecord,
      currentPage: pageNumber,
      recordsPerPage: take,
    };

    return { data: genres, metadata: pagination };
  }

  @Get(':id')
  async get(@Param('id') genreId: number): Promise<Genre> {
    const genre = await this.getGenreService.get(genreId);

    if (!genre) {
      throw new GenreUnexistingException();
    }

    return genre;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateGenreDto,
  ): Promise<Genre> {
    const genre = await this.getGenreService.get(id);

    if (!genre) {
      throw new GenreUnexistingException();
    }

    return this.updateGenreService.update(id, dto);
  }

  @UseLocalMapperInterceptor(StringVM, StringVM)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<IStringResponse> {
    const genre = await this.get(id);

    if (!genre) {
      throw new GenreUnexistingException();
    }

    await this.deleteGenreService.delete(id);

    return { data: `Genre with ID ${id} has been deleted` };
  }
}
