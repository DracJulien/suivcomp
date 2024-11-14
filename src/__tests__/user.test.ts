import request from 'supertest';
import app from '../index';
import prisma from '../middlewares/prisma';
import bcrypt from 'bcryptjs';

describe('User Endpoints', () => {
  let adminToken: string;
  let userToken: string;
  let createdUserId: number;

  beforeAll(async () => {
    // Nettoyer les utilisateurs et les rôles
    await prisma.user.deleteMany({
      where: {
        username: {
          in: ['admin_user', 'testuser_user', 'updateduser_user'],
        },
      },
    });


    // Créer un utilisateur administrateur
    await prisma.user.create({
      data: {
        username: 'admin_user',
        password: await bcrypt.hash('AdminPassword123!', 10),
        role: {
          connect: { name: 'Admin' },
        },
        active: true,
      },
    });

    // Créer ou mettre à jour un utilisateur standard
    const user = await prisma.user.upsert({
      where: { username: 'testuser_user' },
      update: {
        password: await bcrypt.hash('UserPassword123!', 10),
        role: {
          connect: { name: 'User' },
        },
        active: true,
      },
      create: {
        username: 'testuser_user',
        password: await bcrypt.hash('UserPassword123!', 10),
        role: {
          connect: { name: 'User' },
        },
        active: true,
      },
    });

    createdUserId = user.id;
console.log('Response body for user update:', createdUserId);
    // Obtenir les tokens
    const adminLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin_user',
        password: 'AdminPassword123!',
      });

    adminToken = adminLoginRes.body.token;

    const userLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser_user',
        password: 'UserPassword123!',
      });

    userToken = userLoginRes.body.token;
  });

  afterAll(async () => {
    // Nettoyage de la base de données
    await prisma.user.deleteMany({
      where: {
        username: {
          in: [ 'testuser_user', 'updateduser_user'],
        },
      },
    });

  });

  it('should get all users as admin', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a user as admin', async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'updateduser_user' });

    console.log('Response body for user update:', res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully');
    expect(res.body.updatedUser.username).toBe('updateduser_user');
  });

  it('should deactivate the user as admin', async () => {
    const res = await request(app)
      .patch(`/api/users/deactivate/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deactivated successfully');
  });

  it('should deactivate user himself admin privileges', async () => {
    const res = await request(app)
      .patch(`/api/users/deactivate/${createdUserId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deactivated successfully');
  });

  it('should delete the user as admin', async () => {
    const res = await request(app)
      .delete(`/api/users/delete/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });
});
