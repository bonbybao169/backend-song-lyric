import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';

describe('Authors E2E', () => {
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

  describe('POST /api/admin/authors', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/admin/authors')
        .send({
          name: 'Author',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201)
        .expect({
          data: {
            id: 1,
            name: 'Author',
            dateOfBirth: null,
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('GET /api/admin/authors', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/authors')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: [
            {
              id: 1,
              name: 'Author',
              dateOfBirth: null,
              numberOfSongs: 0,
            },
          ],
          metadata: { totalRecord: 1, currentPage: 1, recordsPerPage: 5 },
        });
    });
  });

  describe('GET /api/admin/authors/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/authors/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Author',
            dateOfBirth: null,
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('UPDATE /api/admin/authors/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .put('/admin/authors/1')
        .send({ name: 'mtp' })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'mtp',
            dateOfBirth: null,
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('DELETE /api/admin/authors/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .delete('/admin/authors/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({ data: 'Author with ID 1 has been deleted' });
    });
  });
});
