import request from 'supertest';
import { app } from '../../server.js';
import { PrismaClient } from '@prisma/client';
import { createTestUser, generateTestToken, cleanupDatabase, testOperation } from '../helpers.js';

const prisma = new PrismaClient();

describe('Operations Controller', () => {
    let employee;
    let manager;
    let employeeToken;
    let managerToken;

    beforeEach(async () => {
        await cleanupDatabase();

        employee = await createTestUser({
            email: 'employee@example.com',
            role: 'EMPLOYEE'
        });

        manager = await createTestUser({
            email: 'manager@example.com',
            role: 'MANAGER'
        });

        employeeToken = generateTestToken(employee);
        managerToken = generateTestToken(manager);
    });

    describe('POST /api/v1/operations', () => {
        it('should create an operation request', async () => {
            const response = await request(app)
                .post('/api/v1/operations')
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(testOperation);

            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.status).toBe('PENDING');
            expect(response.body.data.requesterId).toBe(employee.id);
        });

        it('should validate required fields', async () => {
            const invalidOperation = {
                title: '',
                description: testOperation.description
            };

            const response = await request(app)
                .post('/api/v1/operations')
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(invalidOperation);

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/v1/operations', () => {
        beforeEach(async () => {
            await prisma.operation.create({
                data: {
                    ...testOperation,
                    requesterId: employee.id
                }
            });
        });

        it('should fetch all operations for manager', async () => {
            const response = await request(app)
                .get('/api/v1/operations')
                .set('Authorization', `Bearer ${managerToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it('should fetch operations requested by employee', async () => {
            const response = await request(app)
                .get('/api/v1/operations')
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('PATCH /api/v1/operations/:id', () => {
        let operation;

        beforeEach(async () => {
            operation = await prisma.operation.create({
                data: {
                    ...testOperation,
                    requesterId: employee.id
                }
            });
        });

        it('should allow manager to update operation status', async () => {
            const response = await request(app)
                .patch(`/api/v1/operations/${operation.id}`)
                .set('Authorization', `Bearer ${managerToken}`)
                .send({ status: 'IN_PROGRESS' });

            expect(response.status).toBe(200);
            expect(response.body.data.status).toBe('IN_PROGRESS');
        });

        it('should allow updating operation details', async () => {
            const updates = {
                description: 'Updated description',
                priority: 'HIGH'
            };

            const response = await request(app)
                .patch(`/api/v1/operations/${operation.id}`)
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(updates);

            expect(response.status).toBe(200);
            expect(response.body.data.description).toBe(updates.description);
            expect(response.body.data.priority).toBe(updates.priority);
        });
    });

    describe('DELETE /api/v1/operations/:id', () => {
        let operation;

        beforeEach(async () => {
            operation = await prisma.operation.create({
                data: {
                    ...testOperation,
                    requesterId: employee.id
                }
            });
        });

        it('should allow canceling pending operation', async () => {
            const response = await request(app)
                .delete(`/api/v1/operations/${operation.id}`)
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.status).toBe(200);
        });

        it('should not allow deleting approved operation', async () => {
            await prisma.operation.update({
                where: { id: operation.id },
                data: { status: 'APPROVED' }
            });

            const response = await request(app)
                .delete(`/api/v1/operations/${operation.id}`)
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.status).toBe(400);
        });
    });
});
