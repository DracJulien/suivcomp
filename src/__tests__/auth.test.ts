import request from 'supertest';
import app from '../index';
import prisma from '../middlewares/prisma';


describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Nettoyer les utilisateurs utilisés dans les tests d'authentification
    await prisma.user.deleteMany({
      where: {
        username: {
          in: ['testuser_auth', 'admin_auth'],
        },
      },
    });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser_auth',
        password: 'Password123!',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should fail with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'wronguser',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  afterAll(async () => {
    // Supprimer les utilisateurs créés par les tests d'authentification
    await prisma.user.deleteMany({
      where: {
        username: {
          in: ['testuser_auth', 'admin_auth'],
        },
      },
    });
  });
});
