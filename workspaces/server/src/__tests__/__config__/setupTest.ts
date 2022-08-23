import { Prisma } from '@prisma/client';
import { plural } from 'pluralize';
import { snakeCase } from 'lodash';

import { prisma } from './prisma';

afterAll(async () => {
  const modelNames = Prisma.dmmf.datamodel.models.map((model) => {
    return plural(snakeCase(model.name));
  });

  await Promise.all(
    modelNames.map((model) => {
      return prisma.$executeRawUnsafe(
        `TRUNCATE TABLE ${model} RESTART IDENTITY CASCADE;`,
      );
    }),
  );

  await prisma.$disconnect();
});
