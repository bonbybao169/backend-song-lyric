import { Injectable } from '@nestjs/common';

import type { Singer } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class DeleteSingersService {
  constructor(private prisma: PrismaService) {}

  delete(id: number): Promise<Singer> {
    return this.prisma.singer.delete({
      where: {
        id,
      },
    });
  }
}
