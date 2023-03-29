import { knex } from './seeders/client';
import request from 'supertest';
import { HOST, PORT } from './helpers';

describe('authenticate TEST', () => {
  const API_DOMAIN = `${HOST}:${PORT}`;
  const username = `prochicken${Date.now()}`;

  describe('POST /api/v1/register/normal', () => {
    it('Normal register successfully', async () => {
      const response = await request(API_DOMAIN)
        .post('/api/v1/register/normal')
        .send({
          username,
          password: 'Test1234@',
        });
      expect(response.status).toBe(201);
    });
    it('Register with an existed username', async () => {
      const response = await request(API_DOMAIN)
        .post('/api/v1/register/normal')
        .send({
          username,
          password: 'Test1234@',
        });
      expect(response.status).toBe(400);
    });
  });
  afterAll(async () => {
    await knex('users').where('username', username).delete();
  });
});
