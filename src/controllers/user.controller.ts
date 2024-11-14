import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../middlewares/prisma';
import { validatePassword } from '../utils/validatePassword';

export const getAllUsers = async (req: Request, res: Response) : Promise<void> =>{
  try{
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(500).json({message: 'Server error', error: (error as Error).message})
    return;
  }
}


export const updateUser = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const { username, password, roleName } = req.body;

    // Créer un objet de mise à jour dynamiquement
    const updateData: { username?: string; password?: string; role?: { connect: { id: number } } } = {};
    if (username) {
      updateData.username = username;
    }
    if (password) {
      // Utiliser la fonction validatePassword
      if (validatePassword(password)) {
        res.status(400).json({ message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character' });
        return;
      }
      updateData.password = await bcrypt.hash(password, 10);
    }
    if (roleName) {
      const role = await prisma.role.findUnique({ where: { name: roleName } });
      if (!role) {
        res.status(400).json({ message: 'Role not found' });
        return;
      }
      updateData.role = { connect: { id: role.id } };
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
      return;
    } else {
      res.status(500).json({ message: 'Unknown server error' });
      return;
    }
  }
}
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: 'id is required' });
    return;
  }

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(201).json({ message: 'User deleted successfully' });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
      return;
    } else {
      res.status(500).json({ message: 'Unknown server error' });
      return;
    }
  }
};

export const deactivateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);
 
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { active: false },
  });
    res.status(200).json({ message: 'User deactivated successfully', user });
    return;
   } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
      return;
    } else {
      res.status(500).json({ message: 'Unknown server error' });
      return;
    }
  }
}