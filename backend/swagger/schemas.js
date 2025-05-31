export const schemas = {
  Error: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: false
      },
      message: {
        type: 'string',
        example: 'Error description'
      },
      error: {
        type: 'object',
        nullable: true
      }
    }
  },
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
  UserResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        example: 'clh12345'
      },
      email: {
        type: 'string',
        format: 'email'
      },
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      role: {
        type: 'string',
        enum: ['ADMIN', 'EMPLOYEE', 'SUPERVISOR', 'HR', 'FINANCE']
      },
      department: {
        type: 'string'
      },
      status: {
        type: 'string',
        enum: ['ACTIVE', 'INACTIVE']
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
        properties: {
          user: {
            $ref: '#/components/schemas/UserResponse'
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
