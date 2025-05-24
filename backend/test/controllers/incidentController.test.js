import request from 'supertest';
import { app } from '../../server.js';
import { PrismaClient } from '@prisma/client';
import { createTestUser, generateTestToken, cleanupDatabase, testIncident } from '../helpers.js';

const prisma = new PrismaClient();

describe('Incident Controller', () => {
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

    describe('POST /api/v1/incidents', () => {
        it('should create an incident report', async () => {
            const response = await request(app)
                .post('/api/v1/incidents')
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(testIncident);

            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.status).toBe('OPEN');
            expect(response.body.data.reporterId).toBe(employee.id);
        });

        it('should require incident description', async () => {
            const invalidIncident = {
                ...testIncident,
                description: ''
            };

            const response = await request(app)
                .post('/api/v1/incidents')
                .set('Authorization', `Bearer ${employeeToken}`)
                .send(invalidIncident);

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/v1/incidents', () => {
        beforeEach(async () => {
            await prisma.incident.create({
                data: {
                    ...testIncident,
                    reporterId: employee.id
                }
            });
        });

        it('should fetch all incidents for manager', async () => {
            const response = await request(app)
                .get('/api/v1/incidents')
                .set('Authorization', `Bearer ${managerToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });

        it('should fetch incidents reported by employee', async () => {
            const response = await request(app)
                .get('/api/v1/incidents')
                .set('Authorization', `Bearer ${employeeToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        });
    });

    describe('PATCH /api/v1/incidents/:id', () => {
        let incident;

        beforeEach(async () => {
            incident = await prisma.incident.create({
                data: {
                    ...testIncident,
                    reporterId: employee.id
                }
            });
        });

        it('should allow manager to update incident status', async () => {
            const response = await request(app)
                .patch(`/api/v1/incidents/${incident.id}`)
                .set('Authorization', `Bearer ${managerToken}`)
                .send({ status: 'IN_PROGRESS' });

            expect(response.status).toBe(200);
            expect(response.body.data.status).toBe('IN_PROGRESS');
        });

        it('should allow adding comments to incident', async () => {
            const response = await request(app)
                .patch(`/api/v1/incidents/${incident.id}`)
                .set('Authorization', `Bearer ${employeeToken}`)
                .send({ comment: 'Test comment' });

            expect(response.status).toBe(200);
            expect(response.body.data.comments).toContain('Test comment');
        });
    });

    describe('GET /api/v1/incidents/:id', () => {
        let incident;

        beforeEach(async () => {
            incident = await prisma.incident.create({
                data: {
                    ...testIncident,
                    reporterId: employee.id
                }
            });
        });

        it('should fetch incident details', async () => {
            const response = await request(app)
                .get(`/api/v1/incidents/${incident.id}`)
                .set('Authorization', `Bearer ${managerToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(incident.id);
        });

        it('should return 404 for non-existent incident', async () => {
            const response = await request(app)
                .get('/api/v1/incidents/999999')
                .set('Authorization', `Bearer ${managerToken}`);

            expect(response.status).toBe(404);
        });
    });
});
