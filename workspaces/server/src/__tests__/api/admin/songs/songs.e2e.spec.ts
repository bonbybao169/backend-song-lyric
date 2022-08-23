import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';

describe('Songs E2E', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await initializerApp();

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@gmail.com', password: 'admin' })
      .expect(201);

    accessToken = loginRes.body.metadata.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/admin/songs', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/admin/songs')
        .send({
          name: 'Song',
          length: 300,
          url: 'hihi',
          genres: [],
          singers: [],
          authors: [],
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201)
        .expect({
          data: {
            id: 1,
            name: 'Song',
            length: 300,
            view: 0,
            url: 'hihi',
            singers: [],
            authors: [],
            genres: [],
          },
        });
    });
  });

  describe('GET /api/admin/songs', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/songs')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: [
            {
              id: 1,
              name: 'Song',
              length: 300,
              view: 0,
              url: 'hihi',
            },
          ],
          metadata: { totalRecord: 1, currentPage: 1, recordsPerPage: 5 },
        });
    });
  });

  describe('GET /api/admin/songs/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/songs/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Song',
            length: 300,
            view: 0,
            url: 'hihi',
            singers: [],
            authors: [],
            genres: [],
          },
        });
    });
  });

  describe('UPDATE /api/admin/songs/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .put('/admin/songs/1')
        .send({ name: 'Hihi' })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Hihi',
            length: 300,
            view: 0,
            url: 'hihi',
            singers: [],
            authors: [],
            genres: [],
          },
        });
    });
  });

  describe('DELETE /api/admin/songs/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .delete('/admin/songs/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: 'Song with ID 1 has been deleted',
        });
    });
  });
});
