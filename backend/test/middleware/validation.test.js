const { validateLogin } = require('../../middleware/validation');

describe('Validation Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
        mockRequest = {
            body: {}
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        nextFunction = jest.fn();
    });

    describe('validateLogin', () => {
        it('should pass valid email and password', () => {
            mockRequest.body = {
                email: 'test@example.com',
                password: 'password123'
            };

            validateLogin(mockRequest, mockResponse, nextFunction);

            expect(nextFunction).toHaveBeenCalled();
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
        });

        it('should fail when email is missing', () => {
            mockRequest.body = {
                password: 'password123'
            };

            validateLogin(mockRequest, mockResponse, nextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Email and password are required'
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });

        it('should fail when password is missing', () => {
            mockRequest.body = {
                email: 'test@example.com'
            };

            validateLogin(mockRequest, mockResponse, nextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Email and password are required'
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });

        it('should fail with invalid email format', () => {
            mockRequest.body = {
                email: 'invalid-email',
                password: 'password123'
            };

            validateLogin(mockRequest, mockResponse, nextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Invalid email format'
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });

        it('should fail with short password', () => {
            mockRequest.body = {
                email: 'test@example.com',
                password: '12345'
            };

            validateLogin(mockRequest, mockResponse, nextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Password must be at least 6 characters long'
            });
            expect(nextFunction).not.toHaveBeenCalled();
        });
    });
});
