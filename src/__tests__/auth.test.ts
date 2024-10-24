import request from 'supertest';
import app from '../index'; // Modifiez ce chemin selon l'endroit où se trouve votre fichier Express principal

describe('Auth Endpoints', () => {
  it('should fail to register a new user', async () => {
    const res1 = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'Password123',
        roleName: 'User',
      });

    expect(res1.statusCode).toEqual(400);
    expect(res1.body).not.toHaveProperty('user');
  });

  it('should fail with invalid credentials', async () => {
    const res2 = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'wronguser',
        password: 'wrongpassword'
      });

    expect(res2.statusCode).toEqual(401);
    expect(res2.body).toHaveProperty('message', 'Invalid credentials');
  });

  // Ajouter un test d'attente de fermeture explicite pour éviter l'arrêt prématuré
  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  });
});
