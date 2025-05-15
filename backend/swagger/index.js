import { swaggerDocument } from './config.js';
import { schemas } from './schemas.js';
import { responses } from './responses.js';
import swaggerUi from 'swagger-ui-express';

// Merge schemas and responses into the main document
swaggerDocument.components.schemas = schemas;
swaggerDocument.components.responses = responses;

export const swaggerConfig = {
    swaggerDefinition: swaggerDocument,
    apis: ['./routes/v1/*.js']
};

export const swaggerUiOptions = {
    customSiteTitle: "TLP Systems API Documentation",
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 20px 0 }
        .swagger-ui .scheme-container { background: none; box-shadow: none; margin: 0 }
        .swagger-ui .auth-wrapper { justify-content: start }
    `,
    swaggerOptions: {
        persistAuthorization: true,
        filter: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        defaultModelExpandDepth: 3,
        defaultModelsExpandDepth: 3
    }
};

export const setupSwagger = (app) => {
    // Serve SwaggerUI at /api-docs
    app.use('/api-docs', swaggerUi.serve);
    app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
        customCss: `
            .swagger-ui .topbar { display: none }
            .swagger-ui .info { margin: 20px 0 }
            .swagger-ui .scheme-container { background: none; box-shadow: none; margin: 0 }
            .swagger-ui .auth-wrapper { justify-content: start }
            .swagger-ui .opblock-tag { font-size: 18px; border-bottom: 1px solid #eee; }
            .swagger-ui .opblock { margin: 0 0 15px; }
            .swagger-ui table tbody tr td { padding: 8px 0; }
        `,
        customSiteTitle: "TLP Systems API Documentation",
        swaggerOptions: {
            persistAuthorization: true,
            filter: true,
            displayRequestDuration: true,
            docExpansion: 'none',
            defaultModelsExpandDepth: 3,
            defaultModelExpandDepth: 3,
            syntaxHighlight: {
                theme: 'monokai'
            }
        }
    }));

    // Serve OpenAPI spec in different formats
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=300'); // Cache for 5 minutes
        res.send(swaggerDocument);
    });

    app.get('/api-docs.yaml', (req, res) => {
        const yaml = YAML.stringify(swaggerDocument, 10);
        res.setHeader('Content-Type', 'text/yaml');
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.send(yaml);
    });
};
