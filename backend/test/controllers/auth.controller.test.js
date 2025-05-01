const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const { createTestUser, prisma } = require('../helpers');

describe('Auth Controller', () => {
    let testUser;

    beforeEach(async () => {
        try {
            // Create a fresh test user for each test
            testUser = await createTestUser({
                email: 'test@example.com',
                password: 'testPassword123'
            });
            console.log('Test user created:', testUser);
        } catch (error) {
            console.error('Error creating test user:', error);
            throw error;
        }
    });

    afterAll(async () => {
        if (testUser?.id) {
            // Clean up test user
            await prisma.user.delete({
                where: { id: testUser.id }
            });
        }
        await prisma.$disconnect();
    });

    describe('POST /api/auth/login', () => {
        it('should login successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'testPassword123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('email', 'test@example.com');
            expect(response.body).toHaveProperty('redirectUrl', '/dashboard');

            // Verify JWT token
            const decodedToken = jwt.verify(response.body.token, process.env.JWT_SECRET);
            expect(decodedToken).toHaveProperty('userId', testUser.id);
            expect(decodedToken).toHaveProperty('role', 'EMPLOYEE');
        });

        it('should fail with invalid password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid credentials');
        });

        it('should fail with non-existent email', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'testPassword123'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Invalid credentials');
        });

        it('should fail with inactive user', async () => {
            // Update user status to inactive
            await prisma.user.update({
                where: { id: testUser.id },
                data: { status: 'INACTIVE' }
            });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'testPassword123'
                });

            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('message', 'Account is not active');

            // Reset user status
            await prisma.user.update({
                where: { id: testUser.id },
                data: { status: 'ACTIVE' }
            });
        });
    });
});
