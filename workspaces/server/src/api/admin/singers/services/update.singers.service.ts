import { Injectable } from '@nestjs/common';

import type { Singer } from '@prisma/client';

import { UpdateSingerDto } from 'api/admin/singers/dtos';
import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class UpdateSingersService {
  constructor(private prisma: PrismaService) {}

  update(id: number, dto: UpdateSingerDto): Promise<Singer> {
    return this.prisma.singer.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
