import request from 'supertest';
import app from '../src/app.js';

const TOKEN = '12345';

describe('Pruebas de Integración - Obel Challenge', () => {
  
  // Test 1: Seguridad (Obligatorio por el PDF)
  it('Debería fallar con 401 si no hay token', async () => {
    const res = await request(app).get('/api/roles');
    expect(res.statusCode).toEqual(401);
  });

  // Test 2: Creación de Roles (Funcionalidad principal)
  it('Debería crear un nuevo rol cuando el nombre es enviado', async () => {
    const res = await request(app)
      .post('/api/roles')
      .set('Authorization', TOKEN)
      .send({
        name: "Full Planche Expert",
        description: "Solo para los que dominan la calistenia"
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe("Full Planche Expert");
  });
});