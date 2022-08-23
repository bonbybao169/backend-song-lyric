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

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'test@gmail.com',
        password: '121212',
      })
      .expect((res) => {
        token = res.body.metadata.accessToken;
      });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/lyrics', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/v1/lyrics')
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

  describe('POST /api/v1/lyrics/draft', () => {
    it('returns code 201 when create success', async () => {
      return request(app.getHttpServer())
        .post('/v1/lyrics/draft')
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
            id: 2,
            songId: 1,
            languageCode: 'vi',
            content: 'aaa',
            translatorId: 1,
            default: true,
            status: 'draft',
          },
        });
    });
  });

  describe('UPDATE /api/v1/lyrics/:id', () => {
    it('returns code 200', async () => {
      return request(app.getHttpServer())
        .put('/v1/lyrics/1')
        .send({
          languageCode: 'en',
          content: 'hi',
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect({
          data: {
            id: 1,
            songId: 1,
            languageCode: 'en',
            content: 'hi',
            translatorId: 1,
            default: true,
            status: 'pending',
          },
        });
    });
  });
});
