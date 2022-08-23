import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';

describe('Singers E2E', () => {
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

  describe('POST /api/admin/singers', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/admin/singers')
        .send({
          name: 'Singer',
        })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(201)
        .expect({
          data: {
            id: 1,
            name: 'Singer',
            dateOfBirth: null,
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('GET /api/admin/singers', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/singers')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: [
            {
              id: 1,
              name: 'Singer',
              dateOfBirth: null,
              numberOfSongs: 0,
            },
          ],
          metadata: { totalRecord: 1, currentPage: 1, recordsPerPage: 5 },
        });
    });
  });

  describe('GET /api/admin/singers/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .get('/admin/singers/1')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            name: 'Singer',
            dateOfBirth: null,
            numberOfSongs: 0,
          },
        });
    });
  });

  describe('UPDATE /api/admin/singers/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .put('/admin/singers/1')
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
});
