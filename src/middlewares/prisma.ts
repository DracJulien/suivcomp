/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Middleware Prisma pour supprimer le champ 'password' des réponses
prisma.$use(async (params, next) => {
  const result = await next(params);

  // Supprimer le mot de passe des résultats 'user' uniquement
  if (params.model === 'User' && params.action !== 'findUnique') {
    if (Array.isArray(result)) {
      return result.map(({ password, ...rest }) => rest);
    } else if (result && typeof result === 'object') {
      const { password, ...rest } = result;
      return rest;
    }
  }

  return result;
});


export default prisma;
