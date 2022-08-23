import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';
import { FAIL_LOGIN } from 'commons/filters/exceptions/auth/constants';

describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initializerApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/auth/signup', () => {
    it('returns code 201 when signup success', async () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@gmail.com',
          password: '121212',
        })
        .expect(201)
        .expect((res) => ({
          data: {
            id: 1,
            email: 'test@gmail.com',
            role: 'user',
            firstName: '',
            lastName: '',
            numberOfUploads: 0,
          },
          metadata: {
            accessToken: res.body.metadata.accessToken,
            refreshToken: res.body.metadata.refreshToken,
          },
        }));
    });
  });

  describe('POST /api/auth/login', () => {
    const LOGIN_URL = '/auth/login';

    it('returns code 201 when login success', async () => {
      return request(app.getHttpServer())
        .post(LOGIN_URL)
        .send({
          email: 'test@gmail.com',
          password: '121212',
        })
        .expect(201)
        .expect((res) => ({
          data: {
            id: 1,
            email: 'test@gmail.com',
            role: 'user',
            firstName: '',
            lastName: '',
            numberOfUploads: 0,
          },
          metadata: {
            accessToken: res.body.metadata.accessToken,
            refreshToken: res.body.metadata.refreshToken,
          },
        }));
    });

    it('returns code 403 when invalid email', async () => {
      return request(app.getHttpServer())
        .post(LOGIN_URL)
        .send({
          email: 'test2@gmail.com',
          password: '121212',
        })
        .expect(401)
        .expect(() => ({
          error: {
            statusCode: 401,
            code: FAIL_LOGIN,
            message: 'Username or password is incorrect',
          },
        }));
    });

    it('returns code 403 when invalid password', async () => {
      return request(app.getHttpServer())
        .post(LOGIN_URL)
        .send({
          email: 'test@gmail.com',
          password: '121213',
        })
        .expect(401)
        .expect(() => ({
          error: {
            statusCode: 401,
            code: FAIL_LOGIN,
            message: 'Username or password is incorrect',
          },
        }));
    });
  });
});
