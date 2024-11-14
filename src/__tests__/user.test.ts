import request from 'supertest';
import app from '../index';
import prisma from '../middlewares/prisma';
import bcrypt from 'bcryptjs';

describe('User Endpoints', () => {
  let adminToken: string;
  let userToken: string;
  let createdUserId: number;

  beforeAll(async () => {
    // Nettoyer les utilisateurs et les rôles utilisés dans les tests
    await prisma.user.deleteMany({
      where: {
        username: {
          in: ['admin_user', 'testuser_user', 'updateduser_user'],
        },
      },
    });

    await prisma.role.upsert({
      where: { name: 'Admin' },
      update: {},
      create: { name: 'Admin' },
    });

    await prisma.role.upsert({
      where: { name: 'User' },
      update: {},
      create: { name: 'User' },
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

    // Créer ou mettre à jour un utilisateur standard avec `upsert`
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

    // Obtenir un token d'authentification pour l'administrateur
    const adminLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin_user',
        password: 'AdminPassword123!',
      });

    adminToken = adminLoginRes.body.token;

    // Obtenir un token d'authentification pour l'utilisateur
    const userLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser_user',
        password: 'UserPassword123!',
      });

    userToken = userLoginRes.body.token;
  });

  it('should get all users as admin', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fail to get all users as non-admin', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'Access forbidden: insufficient rights');
  });

  it('should update a user as admin', async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ username: 'updateduser_user' });

    // Afficher le corps de la réponse pour comprendre pourquoi la mise à jour échoue
    console.log('Response body for user update:', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated successfully');
    expect(res.body.user.username).toBe('updateduser_user');
  });

  it('should fail to update user without admin privileges', async () => {
    const res = await request(app)
      .put(`/api/users/${createdUserId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ username: 'attemptedupdate_user' });

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'Access forbidden: insufficient rights');
  });

  it('should deactivate the user as admin', async () => {
    const res = await request(app)
      .patch(`/api/users/deactivate/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deactivated successfully');
  });

  it('should fail to deactivate user without admin privileges', async () => {
    const res = await request(app)
      .patch(`/api/users/deactivate/${createdUserId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'Access forbidden: insufficient rights');
  });

  it('should delete the user as admin', async () => {
    const res = await request(app)
      .delete(`/api/users/delete/${createdUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted successfully');
  });

  afterAll(async () => {
    // Nettoyage de l'administrateur et des utilisateurs créés pendant les tests
    await prisma.user.deleteMany({
      where: {
        username: {
          in: ['admin_user', 'testuser_user', 'updateduser_user'],
        },
      },
    });

    await prisma.role.deleteMany({
      where: {
        name: {
          in: ['Admin', 'User'],
        },
      },
    });
  });
});
