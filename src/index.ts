import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';
import userRoutes from './routes/user.routes';

import { jsonErrorHandler, globalErrorHandler, handleJsonParsingError } from './middlewares/jsonErrorHandler';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(jsonErrorHandler);

// Utiliser le middleware de gestion des erreurs JSON après jsonErrorHandler
app.use(handleJsonParsingError);

// Configuration de Swagger
const swaggerOptions = {
   swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API with Swagger and TypeScript',
      version: '1.0.0',
      description: 'API documentation for Node.js API with Swagger and TypeScript',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes)
app.use('/api/roles', roleRoutes);

// Middleware de gestion des autres erreurs
app.use(globalErrorHandler);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});


export default app;