export const responses = {
  UnauthorizedError: {
    description: 'Authentication credentials are missing or invalid',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        },
        example: {
          success: false,
          message: 'Unauthorized',
          error: 'Invalid token provided'
        }
      }
    }
  },
  ValidationError: {
    description: 'Validation failed for the request',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        },
        example: {
          success: false,
          message: 'Validation failed',
          error: {
            field: ['validation error message']
          }
        }
      }
    }
  },
  ServerError: {
    description: 'Internal server error occurred',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Error'
        },
        example: {
          success: false,
          message: 'Internal server error',
          error: null
        }
      }
    }
  }
};
