import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { setupApp } from '../../config/index.js';
import { login, register, getProfile } from '../../controllers/authController.js';
import { authenticate } from '../../middleware/auth.js';
import { factories, mockRequestResponse } from '../helpers/testHelper.js';
import { prisma } from '../../db/index.js';

// Create Express app instance for testing
const app = express();
setupApp(app);

// Setup routes for testing
app.post('/api/v1/auth/login', login);
app.post('/api/v1/auth/register', register);
app.get('/api/v1/auth/profile', authenticate, getProfile);

describe('Auth Controller', () => {
    // Test data
    const validUserData = {
        email: 'testuser@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
        role: 'EMPLOYEE',
        department: 'Testing',
        status: 'ACTIVE',
        contractType: 'PERMANENT'
    };

    beforeEach(async () => {
        // Clean up database before each test
        await prisma.user.deleteMany();
    });

    describe('POST /api/v1/auth/register', () => {
        test('should register a new user successfully', async () => {
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(validUserData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.email).toBe(validUserData.email);
            expect(response.body).not.toHaveProperty('password');
        });

        test('should fail registration with invalid email', async () => {
            const invalidData = {
                ...validUserData,
                email: 'invalid-email'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(invalidData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test('should fail registration with existing email', async () => {
            // First create a user
            await request(app)
                .post('/api/v1/auth/register')
                .send(validUserData);

            // Try to create another user with same email
            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(validUserData);

            expect(response.status).toBe(409);
            expect(response.body.message).toContain('already exists');
        });

        test('should fail registration with missing required fields', async () => {
            const invalidData = {
                email: 'test@example.com'
            };

            const response = await request(app)
                .post('/api/v1/auth/register')
                .send(invalidData);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('POST /api/v1/auth/login', () => {
        beforeEach(async () => {
            // Create a test user before each login test
            await request(app)
                .post('/api/v1/auth/register')
                .send(validUserData);
        });

        test('should login successfully with valid credentials', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: validUserData.email,
                    password: validUserData.password
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('user');
            expect(response.body).toHaveProperty('token');
            expect(response.body.user.email).toBe(validUserData.email);
        });

        test('should fail login with invalid password', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: validUserData.email,
                    password: 'wrongpassword'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toContain('Invalid credentials');
        });

        test('should fail login with non-existent email', async () => {
            const response = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: validUserData.password
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toContain('Invalid credentials');
        });
    });

    describe('GET /api/v1/auth/profile', () => {
        let authToken;
        let testUser;

        beforeEach(async () => {
            // Create a test user and get auth token
            const registerResponse = await request(app)
                .post('/api/v1/auth/register')
                .send(validUserData);

            testUser = registerResponse.body;

            const loginResponse = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: validUserData.email,
                    password: validUserData.password
                });

            authToken = loginResponse.body.token;
        });

        test('should return user profile with valid token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body.email).toBe(validUserData.email);
            expect(response.body).not.toHaveProperty('password');
        });

        test('should fail with invalid token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/profile')
                .set('Authorization', 'Bearer invalid-token');

            expect(response.status).toBe(401);
            expect(response.body.message).toContain('Invalid or expired token');
        });

        test('should fail without token', async () => {
            const response = await request(app)
                .get('/api/v1/auth/profile');

            expect(response.status).toBe(401);
            expect(response.body.message).toContain('Unauthorized');
        });
    });
});
