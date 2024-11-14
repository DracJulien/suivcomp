import request from 'supertest';
import app from '../index';
import prisma from '../middlewares/prisma';
import bcrypt from 'bcryptjs';

describe('Role Endpoints', () => {
  let adminToken: string;

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        username: 'admin_role',
      },
    });

    await prisma.role.deleteMany({
      where: {
        name: {
          in: ['Admin', 'Manager', 'Team Lead', 'TemporaryRole'],
        },
      },
    });

    // Créer le rôle Admin
    await prisma.role.create({ data: { name: 'Admin' } });

    // Créer un utilisateur administrateur
    await prisma.user.create({
      data: {
        username: 'admin_role',
        password: await bcrypt.hash('AdminPassword123!', 10),
        role: {
          connect: { name: 'Admin' },
        },
        active: true,
      },
    });

    const adminLoginRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin_role',
        password: 'AdminPassword123!',
      });

    adminToken = adminLoginRes.body.token;
  });

  it('should successfully create a role', async () => {
    const res = await request(app)
      .post('/api/roles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Manager',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('role');
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { username: 'admin_role' } });
    await prisma.role.deleteMany({ where: { name: { in: ['Admin', 'Manager', 'Team Lead', 'TemporaryRole'] } } });
  });
});
