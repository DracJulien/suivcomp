// middlewares/jsonErrorHandler.ts
import { Request, Response, NextFunction } from 'express';
import express from 'express';

// Middleware JSON personnalisé avec gestion d'erreur
export const jsonErrorHandler = express.json({
  strict: true,
  limit: '10mb',
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf.toString(encoding as BufferEncoding));
    } catch {
      throw new SyntaxError('Invalid JSON format');
    }
  },
});

// Middleware de gestion des erreurs de parsing JSON
export const handleJsonParsingError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error && err.message === 'Invalid JSON format') {
    res.status(400).json({ message: 'Invalid JSON format in request body' });
    return;
  }
  next(err);
  if (err instanceof SyntaxError && err.message === 'Invalid JSON format') {
    res.status(400).json({ message: 'Invalid JSON format in request body' });
  } else {
    next(err);
  }
};

// Middleware de gestion des autres erreurs
export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
    return;
  }
  next();
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error', error: (err as Error).message });
};
