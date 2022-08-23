/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'commons/prisma/prisma.service';

@Injectable()
export class GetTotalQuantityService {
  constructor(private prisma: PrismaService) {}

  public async exec(
    model: Uncapitalize<Prisma.ModelName>,
    search: string = null,
  ): Promise<number> {
    let searchOption: Prisma.SongFindManyArgs = null;

    if (search) {
      const query = search.replace(/\s/g, ' & ');
      searchOption = {
        where: {
          name: { search: query },
        },
      };
    }

    return await (this.prisma[model] as any).count(searchOption);
  }
}
