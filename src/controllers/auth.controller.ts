import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma';
import { validatePassword } from '../utils/validatePassword';
export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, roleName } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  // Valider le mot de passe
  const passwordError = validatePassword(password);
  if (passwordError) {
    res.status(400).json({ message: passwordError });
    return;
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    // Récupérer le rôle à partir du nom
    const role = await prisma.role.findUnique({
      where: { name: roleName || 'User' },
    });

    if (!role) {
      res.status(400).json({ message: `Role ${roleName} does not exist` });
      return;
    }

    // Hasher le mot de passe et créer l'utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        roleId: role.id,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  try {
    // Rechercher l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Comparer le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: 'Role name is required' });
    return;
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(201).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};