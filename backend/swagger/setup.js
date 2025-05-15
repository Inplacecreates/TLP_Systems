import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './config.js';
import { swaggerUiOptions } from './uiOptions.js';

export const setupSwagger = (app) => {
    // Generate swagger specification
    const swaggerSpec = swaggerJsdoc(swaggerConfig);

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
