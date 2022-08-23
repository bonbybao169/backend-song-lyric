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

import type { Author } from '@prisma/client';

import { GetTotalQuantityService } from 'services';
import {
  UseLocalMapperInterceptor,
  UseMapperInterceptor,
} from 'commons/interceptors/MapperInterceptor';
import { AuthorUnexistingException } from 'commons/filters/exceptions/authors/AuthorUnexistingException';
import { StringVM } from 'commons/StringVM';
import { Roles } from 'commons/decorator/roles.decorator';
import { getPageNumberAndLimit } from 'utils/pagy';

import type {
  IDataWithMetadata,
  IPagination,
  IStringResponse,
} from 'interface';

import {
  CreateAuthorsService,
  DeleteAuthorsService,
  GetAllAuthorsService,
  GetAuthorsService,
  UpdateAuthorsService,
} from './services';
import { CreateAuthorDto, UpdateAuthorDto } from './dtos';
import { AuthorPaginationVM, AuthorVM } from './author.vm';

@Roles(Role.admin)
@Controller('authors')
@UseMapperInterceptor(AuthorVM, AuthorVM)
export class AuthorsController {
  constructor(
    private getAuthorService: GetAuthorsService,
    private createAuthorService: CreateAuthorsService,
    private getAllAuthorService: GetAllAuthorsService,
    private updateAuthorService: UpdateAuthorsService,
    private deleteAuthorService: DeleteAuthorsService,
    private getTotalQuantityService: GetTotalQuantityService,
  ) {}

  @Post()
  create(@Body() dto: CreateAuthorDto): Promise<Author> {
    return this.createAuthorService.create(dto);
  }

  @UseLocalMapperInterceptor(AuthorPaginationVM, AuthorPaginationVM)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IDataWithMetadata> {
    const [pageNumber, take, offset] = getPageNumberAndLimit(page, limit);

    const [totalRecord, authors] = await Promise.all([
      this.getTotalQuantityService.exec('author'),
      this.getAllAuthorService.getAll({
        skip: offset,
        take,
      }),
    ]);

    const pagination: IPagination = {
      totalRecord,
      currentPage: pageNumber,
      recordsPerPage: take,
    };

    return { data: authors, metadata: pagination };
  }

  @Get(':id')
  async get(@Param('id') authorId: number): Promise<Author> {
    const author = await this.getAuthorService.get(authorId);

    if (!author) {
      throw new AuthorUnexistingException();
    }

    return author;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.getAuthorService.get(id);

    if (!author) {
      throw new AuthorUnexistingException();
    }

    return this.updateAuthorService.update(id, dto);
  }

  @UseLocalMapperInterceptor(StringVM, StringVM)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<IStringResponse> {
    const author = await this.get(id);

    if (!author) {
      throw new AuthorUnexistingException();
    }

    await this.deleteAuthorService.delete(id);

    return { data: `Author with ID ${id} has been deleted` };
  }
}
