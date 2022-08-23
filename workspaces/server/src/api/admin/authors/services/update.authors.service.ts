import { Injectable } from '@nestjs/common';

import type { Author } from '@prisma/client';

import { UpdateAuthorDto } from 'api/admin/authors/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class UpdateAuthorsService {
  constructor(private prisma: PrismaService) {}

  update(id: number, dto: UpdateAuthorDto): Promise<Author> {
    return this.prisma.author.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
