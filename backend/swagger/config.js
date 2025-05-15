export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'TLP Systems API',
        version: '1.0.0',
        description: 'API documentation for TLP Systems Application',
        contact: {
            name: 'TLP Systems Support',
            email: 'support@tlpsystems.com'
        },
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    servers: [
        {
            url: 'http://localhost:3001/api/v1',
            description: 'Development server'
        }
    ],
    tags: [
        {
            name: 'Auth',
            description: 'Authentication endpoints'
        },
        {
            name: 'Employees',
            description: 'Employee management endpoints'
        },
        {
            name: 'Leave',
            description: 'Leave management endpoints'
        },
        {
            name: 'Incidents',
            description: 'Incident reporting endpoints'
        },
        {
            name: 'Operations',
            description: 'Operations management endpoints'
        }
    ],
    paths: {}, // Will be populated from route files
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {}, // Will be populated from schema files
        responses: {} // Will be populated from response files
    }
};
