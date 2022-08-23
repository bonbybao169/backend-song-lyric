import * as request from 'supertest';

import type { INestApplication } from '@nestjs/common';

import { initializerApp } from '__tests__/commons/initApp';

describe('App E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await initializerApp();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /health', () => {
    it('returns ok', () => {
      return request(app.getHttpServer()).get('/health').expect({ data: 'OK' });
    });
  });
});
