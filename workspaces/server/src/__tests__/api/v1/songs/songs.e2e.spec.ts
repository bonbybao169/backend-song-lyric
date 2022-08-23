import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';
import { prisma } from '__tests__/__config__/prisma';

describe('Songs V1 E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initializerApp();
  });

  beforeAll(async () => {
    await prisma.song.create({
      data: {
        name: 'Song 1',
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/songs', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/v1/songs')
        .expect(200)
        .expect({
          data: [
            {
              id: 1,
              name: 'Song 1',
              length: null,
              view: 0,
              url: null,
            },
          ],
          metadata: { totalRecord: 1, currentPage: 1, recordsPerPage: 5 },
        });
    });
  });

  describe('GET /api/v1/songs/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/v1/songs/1')
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Song 1',
            length: null,
            view: 0,
            url: null,
            singers: [],
            authors: [],
            genres: [],
          },
        });
    });
  });
});
