import request from 'supertest';
import app from '../../src/app.js';

describe('Role API Endpoints', () => {
  const token = process.env.AUTH_TOKEN || '12345';

  test('GET /api/roles debería fallar sin token de autorización', async () => {
    const res = await request(app).get('/api/roles');
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/roles debería crear un nuevo rol exitosamente', async () => {
    const newRole = { name: 'Test Role', type: 'user' };
    const res = await request(app)
      .post('/api/roles')
      .set('Authorization', token)
      .send(newRole);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Role');
  });
});