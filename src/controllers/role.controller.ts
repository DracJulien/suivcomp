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
    const existingRole = await prisma.role.findUnique({
      where: { name },
    });

    if (existingRole) {
      res.status(400).json({ message: 'Role with this name already exists' });
      return;
    }

    const role = await prisma.role.create({
      data: { name },
    });
    res.status(201).json({ message: 'Role created successfully', role });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
    return;
  }
};


export const updateRole = async (req: Request, res: Response): Promise<void> => {
  const { role } = req.params;
  const { newRole } = req.body;

  if (!role || !newRole) {
    res.status(400).json({ message: 'Role name is required' }); 
    return;
  }

  try {
    const updatedRole = await prisma.role.update({
      where: { name: role },
      data: { name: newRole },
    });
    res.status(200).json({ message: 'Role updated successfully', updatedRole });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({message: 'Server error', error: error.message})
      return;
    } else {
      res.status(500).json({message: 'Unknown server error'})
      return;
    }
  }
}


export const deleteRole = async (req: Request, res: Response): Promise<void> => {
  const { role } = req.params;

  if(!role){
    res.status(400).json({ message: 'Role name is required' });
    return;
  }

  try{
    await prisma.role.delete({
      where: { name: role }
    });
    res.status(201).json({ message: 'Role deleted successfully' });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({message: 'Server error', error: error.message})
      return;
    } else {
      res.status(500).json({message: 'Unknown server error'})
      return;
    }
  }
}