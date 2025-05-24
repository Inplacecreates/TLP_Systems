import request from 'supertest';
import { app } from '../../server.js';
import { prisma } from '../setup.js';
import {
    createTestUser,
    setupTestUsers,
    roles,
    validateUserResponse,
    expectSuccess,
    expectError,
    authHeader
} from '../utils/testUtils.js';

describe('Employee Controller', () => {
    let users;

    beforeEach(async () => {
        users = await setupTestUsers();
    });

    describe('GET /api/v1/employees', () => {
        it('should fetch all employees with admin token', async () => {
            const response = await request(app)
                .get('/api/v1/employees')
                .set(authHeader(users.adminToken));

            const data = expectSuccess(response);
            expect(Array.isArray(data)).toBe(true);
            data.forEach(employee => validateUserResponse(employee));
        });

        it('should not allow access without admin token', async () => {
            const response = await request(app)
                .get('/api/v1/employees')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/v1/employees/:id', () => {
        it('should fetch employee by id', async () => {
            const response = await request(app)
                .get(`/api/v1/employees/${testUser.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(testUser.id);
        });

        it('should return 404 for non-existent employee', async () => {
            const response = await request(app)
                .get('/api/v1/employees/999999')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/v1/employees/:id', () => {
        it('should update employee details', async () => {
            const updateData = {
                name: 'Updated Name',
                phone: '1234567890'
            };

            const response = await request(app)
                .put(`/api/v1/employees/${testUser.id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(updateData.name);
            expect(response.body.data.phone).toBe(updateData.phone);
        });
    });

    describe('DELETE /api/v1/employees/:id', () => {
        it('should delete an employee', async () => {
            const response = await request(app)
                .delete(`/api/v1/employees/${testUser.id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);

            const deletedUser = await prisma.user.findUnique({
                where: { id: testUser.id }
            });
            expect(deletedUser).toBeNull();
        });
    });
});
