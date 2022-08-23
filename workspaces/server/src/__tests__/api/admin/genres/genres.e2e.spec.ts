import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';

describe('Genres E2E', () => {
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

  describe('POST /api/admin/genres', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/admin/genres')
        .send({
          name: 'Genre 1',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201)
        .expect({
          data: {
            id: 1,
            name: 'Genre 1',
            numberOfSongs: 0,
          },
        });
    });

    it('returns code 403 when invalid name', async () => {
      return request(app.getHttpServer())
        .post('/admin/genres')
        .send({
          name: 'Genre 1',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(403);
    });
  });

  describe('GET /api/admin/genres', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/genres')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: [
            {
              id: 1,
              name: 'Genre 1',
              numberOfSongs: 0,
            },
          ],
          metadata: { totalRecord: 1, currentPage: 1, recordsPerPage: 5 },
        });
    });
  });

  describe('GET /api/admin/genres/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/genres/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Genre 1',
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('UPDATE /api/admin/genres/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .put('/admin/genres/1')
        .send({ name: 'Love' })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Love',
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('DELETE /api/admin/genres/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .delete('/admin/genres/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({ data: 'Genre with ID 1 has been deleted' });
    });
  });
});
