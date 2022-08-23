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

import type { Singer } from '@prisma/client';

import { GetTotalQuantityService } from 'services';
import {
  UseLocalMapperInterceptor,
  UseMapperInterceptor,
} from 'commons/interceptors/MapperInterceptor';
import { SingerUnexistingException } from 'commons/filters/exceptions/singers/SingerUnexistingException';
import { StringVM } from 'commons/StringVM';
import { Roles } from 'commons/decorator/roles.decorator';
import { getPageNumberAndLimit } from 'utils/pagy';

import type {
  IDataWithMetadata,
  IPagination,
  IStringResponse,
} from 'interface';

import {
  CreateSingersService,
  GetSingersService,
  GetAllSingersService,
  UpdateSingersService,
  DeleteSingersService,
} from './services';
import { CreateSingerDto, UpdateSingerDto } from './dtos';
import { SingerPaginationVM, SingerVM } from './singer.vm';

@Roles(Role.admin)
@Controller('singers')
@UseMapperInterceptor(SingerVM, SingerVM)
export class SingersController {
  constructor(
    private getSingersService: GetSingersService,
    private createSingersService: CreateSingersService,
    private getAllSingersService: GetAllSingersService,
    private updateSingersService: UpdateSingersService,
    private deleteSingersService: DeleteSingersService,
    private getTotalQuantityService: GetTotalQuantityService,
  ) {}

  @Post()
  create(@Body() dto: CreateSingerDto): Promise<Singer> {
    return this.createSingersService.create(dto);
  }

  @UseLocalMapperInterceptor(SingerPaginationVM, SingerPaginationVM)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<IDataWithMetadata> {
    const [pageNumber, take, offset] = getPageNumberAndLimit(page, limit);

    const [totalRecord, singers] = await Promise.all([
      this.getTotalQuantityService.exec('singer'),
      this.getAllSingersService.getAll({
        skip: offset,
        take,
      }),
    ]);

    const pagination: IPagination = {
      totalRecord,
      currentPage: pageNumber,
      recordsPerPage: take,
    };

    return { data: singers, metadata: pagination };
  }

  @Get(':id')
  async get(@Param('id') singerId: number): Promise<Singer> {
    const singer = await this.getSingersService.get(singerId);

    if (!singer) {
      throw new SingerUnexistingException();
    }

    return singer;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSingerDto,
  ): Promise<Singer> {
    const singer = await this.getSingersService.get(id);

    if (!singer) {
      throw new SingerUnexistingException();
    }

    return this.updateSingersService.update(id, dto);
  }

  @UseLocalMapperInterceptor(StringVM, StringVM)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<IStringResponse> {
    const singer = await this.get(id);

    if (!singer) {
      throw new SingerUnexistingException();
    }

    await this.deleteSingersService.delete(id);

    return { data: `Singer with ID ${id} has been deleted` };
  }
}
