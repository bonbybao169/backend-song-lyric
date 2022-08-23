import { Injectable } from '@nestjs/common';

import type { Genre } from '@prisma/client';

import { GenreExistedException } from 'commons/filters/exceptions/genres';
import { CreateGenreDto } from 'api/admin/genres/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

import { GetGenresService } from './get.genres.service';

@Injectable()
export class CreateGenresService {
  constructor(
    private getGenresService: GetGenresService,
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateGenreDto): Promise<Genre> {
    const available = await this.getGenresService.getByName(dto.name);

    if (available) {
      throw new GenreExistedException();
    }

    return this.prisma.genre.create({ data: dto });
  }
}
