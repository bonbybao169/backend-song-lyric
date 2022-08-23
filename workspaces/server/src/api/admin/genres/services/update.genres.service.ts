import { Injectable } from '@nestjs/common';

import type { Genre } from '@prisma/client';

import { GenreExistedException } from 'commons/filters/exceptions/genres';
import { UpdateGenreDto } from 'api/admin/genres/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

import { GetGenresService } from './get.genres.service';

@Injectable()
export class UpdateGenresService {
  constructor(
    private getGenresService: GetGenresService,
    private prisma: PrismaService,
  ) {}

  async update(id: number, dto: UpdateGenreDto): Promise<Genre> {
    if (dto.name) {
      const available = await this.getGenresService.getByName(dto.name);

      if (available && available.id !== id) {
        throw new GenreExistedException();
      }
    }

    return this.prisma.genre.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
