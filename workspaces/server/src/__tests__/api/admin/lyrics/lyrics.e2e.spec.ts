import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';
import { prisma } from '__tests__/__config__/prisma';

describe('Lyrics E2E', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await initializerApp();
  });

  beforeAll(async () => {
    await prisma.song.create({
      data: {
        name: 'Song 1',
      },
    });

    await request(app.getHttpServer()).post('/auth/signup').send({
      email: 'test@gmail.com',
      password: '121212',
    });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@gmail.com', password: 'admin' })
      .expect(201);

    token = loginRes.body.metadata.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/admin/lyrics', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/admin/lyrics')
        .send({
          songId: 1,
          languageCode: 'vi',
          translatorId: 1,
          content: 'aaa',
          default: true,
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect({
          data: {
            id: 1,
            songId: 1,
            languageCode: 'vi',
            content: 'aaa',
            translatorId: 1,
            default: true,
            status: 'pending',
          },
        });
    });
  });

  describe('UPDATE /api/admin/lyrics/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .put('/admin/lyrics/1')
        .send({
          languageCode: 'en',
          content: 'hihi',
          status: 'approved',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            songId: 1,
            languageCode: 'en',
            content: 'hihi',
            translatorId: 1,
            default: true,
            status: 'approved',
          },
        });
    });
  });
});
