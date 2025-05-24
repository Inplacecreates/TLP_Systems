import path from 'path';
import { fileURLToPath } from 'url';

export const swaggerUiOptions = {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        docExpansion: 'none',
        filter: true
    },
    customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info { margin: 20px 0 }
        .swagger-ui .scheme-container { background: none; box-shadow: none; margin: 0 }
        .swagger-ui .auth-wrapper { justify-content: start }
    `
};
