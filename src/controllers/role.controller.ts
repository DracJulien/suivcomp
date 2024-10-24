import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Ajouter un nouveau rôle
export const createRole = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Role name is required' });
    return;
  }

  try {
    const role = await prisma.role.create({
      data: { name },
    });
    res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};
