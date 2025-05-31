export const schemas = {
  // Note: Error schema is defined in common.js to avoid duplication
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'user@example.com'
      },
      password: {
        type: 'string',
        format: 'password',
        example: 'yourPassword123'
      }
    }
  },
  RegisterRequest: {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName', 'department'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'user@example.com'
      },
      password: {
        type: 'string',
        format: 'password',
        example: 'yourPassword123'
      },
      firstName: {
        type: 'string',
        example: 'John'
      },
      lastName: {
        type: 'string',
        example: 'Doe'
      },
      department: {
        type: 'string',
        example: 'IT'
      },
      role: {
        type: 'string',
        enum: ['EMPLOYEE', 'SUPERVISOR', 'HR', 'FINANCE'],
        example: 'EMPLOYEE'
      }
    }
  },
  AuthResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true
      },
      data: {
        type: 'object',
        example: {
          user: {
            $ref: '#/components/schemas/User'
          },
          token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        }
      }
    }
  }
};
