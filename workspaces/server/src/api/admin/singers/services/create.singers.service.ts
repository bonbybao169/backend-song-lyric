import { Injectable } from '@nestjs/common';

import type { Singer } from '@prisma/client';

import { CreateSingerDto } from 'api/admin/singers/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class CreateSingersService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSingerDto): Promise<Singer> {
    return this.prisma.singer.create({ data: dto });
  }
}
