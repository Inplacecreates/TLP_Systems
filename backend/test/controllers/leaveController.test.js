import request from 'supertest';
import { app } from '../../server.js';
import { prisma } from '../setup.js';
import {
    setupTestUsers,
    testData,
    createTestLeave,
    authHeader,
    generateMockLeaves
} from '../utils/testUtils.js';

describe('Leave Controller', () => {
    let users;
    let testLeave;

    beforeEach(async () => {
        users = await setupTestUsers();
        testLeave = await createTestLeave(users.employee);
    });

    describe('POST /api/v1/leave', () => {
        const leaveData = {
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-06-07'),
            type: 'ANNUAL',
            reason: 'Vacation'
        };

        it('should create a leave request', async () => {
            const response = await request(app)
                .post('/api/v1/leave')
                .set(authHeader(users.employeeToken))
                .send(leaveData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('data');
            const data = response.body.data;
            expect(data.status).toBe('PENDING');
            expect(data.userId).toBe(users.employee.id);
            expect(data.type).toBe(leaveData.type);
            expect(new Date(data.startDate)).toEqual(leaveData.startDate);
            expect(new Date(data.endDate)).toEqual(leaveData.endDate);
            expect(data.reason).toBe(leaveData.reason);
        });

        it('should validate leave dates', async () => {
            const invalidLeave = {
                ...leaveData,
                startDate: new Date('2025-06-07'),
                endDate: new Date('2025-06-01')
            };

            const response = await request(app)
                .post('/api/v1/leave')
                .set(authHeader(users.employeeToken))
                .send(invalidLeave);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/date/i);
        });
    });

    describe('GET /api/v1/leave', () => {
        beforeEach(async () => {
            // Create multiple leaves for testing
            await Promise.all([
                createTestLeave(users.employee, {
                    startDate: new Date('2025-07-01'),
                    endDate: new Date('2025-07-07'),
                    type: 'ANNUAL',
                    status: 'PENDING'
                }),
                createTestLeave(users.employee, {
                    startDate: new Date('2025-08-01'),
                    endDate: new Date('2025-08-05'),
                    type: 'SICK',
                    status: 'APPROVED'
                })
            ]);
        });

        it('should get user leaves', async () => {
            const response = await request(app)
                .get('/api/v1/leave')
                .set(authHeader(users.employeeToken));

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data.items)).toBe(true);
            expect(response.body.data.items.length).toBeGreaterThanOrEqual(3); // Including the one from beforeEach
            expect(response.body.data.items[0]).toHaveProperty('userId', users.employee.id);
        });

        it('should filter leaves by status', async () => {
            const response = await request(app)
                .get('/api/v1/leave?status=APPROVED')
                .set(authHeader(users.employeeToken));

            expect(response.status).toBe(200);
            expect(response.body.data.items).toHaveLength(1);
            expect(response.body.data.items[0].status).toBe('APPROVED');
        });
    });

    describe('PATCH /api/v1/leave/:id', () => {
        it('should update a pending leave request', async () => {
            const updateData = {
                reason: 'Updated reason',
                additionalNotes: 'Additional information'
            };

            const response = await request(app)
                .patch(`/api/v1/leave/${testLeave.id}`)
                .set(authHeader(users.employeeToken))
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.data.reason).toBe(updateData.reason);
            expect(response.body.data.additionalNotes).toBe(updateData.additionalNotes);
        });

        it('should not update an approved leave request', async () => {
            const approvedLeave = await createTestLeave(users.employee, { status: 'APPROVED' });

            const response = await request(app)
                .patch(`/api/v1/leave/${approvedLeave.id}`)
                .set(authHeader(users.employeeToken))
                .send({ reason: 'Try to update' });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/v1/leave/:id/approve', () => {
        it('should allow supervisor to approve leave', async () => {
            const response = await request(app)
                .post(`/api/v1/leave/${testLeave.id}/approve`)
                .set(authHeader(users.supervisorToken))
                .send({ comments: 'Approved by supervisor' });

            expect(response.status).toBe(200);
            expect(response.body.data.status).toBe('APPROVED');
        });

        it('should not allow employee to approve leave', async () => {
            const response = await request(app)
                .post(`/api/v1/leave/${testLeave.id}/approve`)
                .set(authHeader(users.employeeToken))
                .send({ comments: 'Try to approve' });

            expect(response.status).toBe(403);
        });
    });

    describe('POST /api/v1/leave/:id/reject', () => {
        it('should allow supervisor to reject leave with reason', async () => {
            const response = await request(app)
                .post(`/api/v1/leave/${testLeave.id}/reject`)
                .set(authHeader(users.supervisorToken))
                .send({ reason: 'Resource constraints' });

            expect(response.status).toBe(200);
            expect(response.body.data.status).toBe('REJECTED');
        });

        it('should require rejection reason', async () => {
            const response = await request(app)
                .post(`/api/v1/leave/${testLeave.id}/reject`)
                .set(authHeader(users.supervisorToken))
                .send({});

            expect(response.status).toBe(400);
        });
    });

    afterEach(async () => {
        await prisma.leave.deleteMany();
        await prisma.user.deleteMany();
    });
});
