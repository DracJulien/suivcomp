import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
}

export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'secretKey') as JwtPayload;

      if (!decoded || !decoded.userId) {
        res.status(403).json({ message: 'Access forbidden: invalid token' });
        return;
      }

      const userId = parseInt(decoded.userId, 10);
      if (isNaN(userId)) {
        res.status(403).json({ message: 'Access forbidden: invalid token' });
        return;
      }

      // Inclure le rôle lors de la recherche de l'utilisateur
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { role: true },
      });

      if (!user || user.role?.name !== requiredRole) {
        res.status(403).json({ message: 'Access forbidden: insufficient rights' });
        return;
      }

      // Passe au middleware suivant si l'utilisateur est autorisé
      next();
    } catch  {
      res.status(403).json({ message: 'Access forbidden: invalid token' });
      return;
    }
  };
};


export const checkRoleOrSelf = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' });
        return;
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, 'secretKey') as JwtPayload;

      const userIdToActOn = parseInt(req.params.id, 10);

      if (!decoded || !decoded.userId) {
        res.status(403).json({ message: 'Access forbidden: invalid token' });
        return;
      }

      const userId = parseInt(decoded.userId, 10);
      if (isNaN(userId)) {
        res.status(403).json({ message: 'Access forbidden: invalid token' });
        return;
      }

      // Include role when fetching the user from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { role: true },
      });

      // Check if the user has the required role or is acting on themselves
      if (!user || (user.role?.name !== requiredRole && user.id !== userIdToActOn)) {
        res.status(403).json({ message: 'Access forbidden: insufficient rights' });
        return;
      }

      // User is authorized
      next();
    } catch (error) {
      console.error("Error in checkRoleOrSelf middleware:", error);
      res.status(403).json({ message: 'Access forbidden: invalid token' });
    }
  };
};