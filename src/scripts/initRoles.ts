import prisma from '../config/prisma';

const initRoles = async () => {
  try {
    // Vérifier si le rôle Admin existe déjà
    const existingAdminRole = await prisma.role.findUnique({
      where: { name: 'Admin' },
    });

    if (!existingAdminRole) {
      // Créer le rôle Admin
      await prisma.role.create({
        data: { name: 'Admin' },
      });
      console.log('Admin role created successfully.');
    } else {
      console.log('Admin role already exists.');
    }

    // Vous pouvez également ajouter d'autres rôles de base ici si nécessaire
    const existingUserRole = await prisma.role.findUnique({
      where: { name: 'User' },
    });

    if (!existingUserRole) {
      await prisma.role.create({
        data: { name: 'User' },
      });
      console.log('User role created successfully.');
    } else {
      console.log('User role already exists.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error initializing roles:', error);
    process.exit(1);
  }
};

initRoles();
