// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin role if it doesn't exist
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
    },
  });

  // Create user role if it doesn't exist
await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
    },
  });

  // Create admin user if it doesn't exist
await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'AdminPassword123!', // Note: Replace with a hashed password in a real application
      roleId: adminRole.id,
      active: true,
    },
  });

  console.log('Seeding completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
