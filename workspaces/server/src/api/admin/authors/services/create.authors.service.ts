import { Injectable } from '@nestjs/common';

import type { Author } from '@prisma/client';

import { CreateAuthorDto } from 'api/admin/authors/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class CreateAuthorsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({ data: dto });
  }
}
