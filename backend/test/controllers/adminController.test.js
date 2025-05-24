import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../server.js';
import { PrismaClient } from '@prisma/client';
import { factories } from '../helpers/testHelper.js';
import { prisma } from '../setup.js';

describe('Admin Controller', () => {
    let admin;
    let employee;
    let adminToken;
    let employeeToken;

    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE "User", "AuditLog", "Setting" RESTART IDENTITY CASCADE`;

        admin = await factories.user.create({
            email: 'admin@example.com',
            role: 'ADMIN'
        });

        employee = await factories.user.create({
            email: 'employee@example.com',
            role: 'EMPLOYEE'
        });

        adminToken = admin.generateToken();
        employeeToken = employee.generateToken();
    });

    describe('GET /api/v1/admin/dashboard', () => {
        it('should fetch admin dashboard data', async () => {
            const response = await request(app)
                .get('/api/v1/admin/dashboard')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('users');
            expect(response.body.data).toHaveProperty('leaves');
            expect(response.body.data).toHaveProperty('incidents');
            expect(response.body.data).toHaveProperty('operations');
        });

        it('should deny access to non-admin users', async () => {
            const response = await request(app)
                .get('/api/v1/admin/dashboard')
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/v1/admin/users', () => {
        it('should fetch all users', async () => {
            const response = await request(app)
                .get('/api/v1/admin/users')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('POST /api/v1/admin/users', () => {
        it('should create a new user', async () => {
            const newUser = {
                email: 'newuser@example.com',
                password: 'Password123!',
                name: 'New User',
                role: 'EMPLOYEE'
            };

            const response = await request(app)
                .post('/api/v1/admin/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newUser);

            expect(response.status).toBe(201);
            expect(response.body.data.email).toBe(newUser.email);
            expect(response.body.data.role).toBe(newUser.role);
        });

        it('should validate user data', async () => {
            const invalidUser = {
                email: 'invalid-email',
                password: '123',
                role: 'INVALID_ROLE'
            };

            const response = await request(app)
                .post('/api/v1/admin/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(invalidUser);

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/v1/admin/audit-logs', () => {
        it('should fetch audit logs', async () => {
            const response = await request(app)
                .get('/api/v1/admin/audit-logs')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should support filtering audit logs', async () => {
            const response = await request(app)
                .get('/api/v1/admin/audit-logs')
                .query({
                    action: 'CREATE',
                    startDate: '2025-01-01',
                    endDate: '2025-12-31'
                })
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('GET /api/v1/admin/settings', () => {
        it('should fetch system settings', async () => {
            const response = await request(app)
                .get('/api/v1/admin/settings')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty('settings');
        });
    });

    describe('PATCH /api/v1/admin/settings', () => {
        it('should update system settings', async () => {
            const settings = {
                maxLeaveDays: 30,
                autoApproveLeave: false,
                notificationSettings: {
                    email: true,
                    push: false
                }
            };

            const response = await request(app)
                .patch('/api/v1/admin/settings')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(settings);

            expect(response.status).toBe(200);
            expect(response.body.data.settings).toMatchObject(settings);
        });
    });
});
