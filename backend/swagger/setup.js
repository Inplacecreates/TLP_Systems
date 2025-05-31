import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './config.js';
import { swaggerUiOptions } from './uiOptions.js';
import { schemas } from './schemas.js';

export const setupSwagger = (app) => {
  // Merge schemas into the config
  const configWithSchemas = {
    ...swaggerConfig,
    definition: {
      ...swaggerConfig.definition,
      components: {
        ...swaggerConfig.definition.components,
        schemas: schemas
      }
    }
  };

  // Generate swagger specification
  const swaggerSpec = swaggerJsdoc(configWithSchemas);

  // Serve swagger docs
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  );

  // Expose swagger.json
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
