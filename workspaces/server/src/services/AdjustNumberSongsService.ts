/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';

import type { Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class AdjustNumberSongsService {
  constructor(private prisma: PrismaService) {}

  public exec(
    model: Uncapitalize<Prisma.ModelName>,
    operator: 'increment' | 'decrement',
    ids: number[],
  ): PrismaPromise<Prisma.BatchPayload> {
    return (this.prisma[model] as any).updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        numberOfSongs: {
          [operator]: 1,
        },
      },
    });
  }
}
