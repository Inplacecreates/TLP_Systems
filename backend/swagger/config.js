import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const swaggerConfig = {
  definition: {
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
        url: '/api',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Admin',
        description: 'Administrative endpoints for system management including user management, system statistics, and audit logs'
      },
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints including login, registration, password management, and token handling'
      },
      {
        name: 'Employees',
        description: 'Employee management endpoints'
      },
      {
        name: 'Leave',
        description: 'Leave management endpoints including applications, approvals, and leave history'
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    paths: {} // Will be populated from route files
  },
  apis: [
    join(__dirname, '..', 'routes', 'v1', '*.js'),
    join(__dirname, 'schemas', '*.js')
  ]
};
