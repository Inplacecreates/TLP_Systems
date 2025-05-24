import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../setup.js';
import testConfig from '../../config/test.js';

// Constants
export const roles = {
    ADMIN: 'ADMIN',
    SUPERVISOR: 'SUPERVISOR',
    EMPLOYEE: 'EMPLOYEE',
    HR: 'HR',
    FINANCE: 'FINANCE'
};

export const testData = {
    user: {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
        role: roles.EMPLOYEE,
        department: 'Engineering',
        contractType: 'PERMANENT'
    },
    leave: {
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-07'),
        reason: 'Vacation',
        type: 'ANNUAL', // From LeaveType enum in schema
        status: 'PENDING' // From Status enum in schema
    },
    incident: {
        title: 'Test Incident',
        description: 'Test incident description',
        severity: 'LOW',
        status: 'OPEN'
    },
    operation: {
        title: 'Test Operation',
        description: 'Test operation request',
        type: 'MAINTENANCE',
        priority: 'MEDIUM',
        status: 'PENDING'
    }
};

// Auth helpers
export async function createTestUser(userData = {}) {
    const defaultUser = {
        ...testData.user,
        password: await bcrypt.hash(testData.user.password, 10),
        ...userData
    };

    return prisma.user.create({
        data: defaultUser
    });
}

export async function createTestUserWithRole(role) {
    return createTestUser({
        email: `${role.toLowerCase()}@example.com`,
        role: role
    });
}

export function generateAuthToken(user) {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role
        },
        testConfig.security.jwtSecret,
        { expiresIn: testConfig.security.jwtExpiry }
    );
}

// Add authorization header for requests
export function authHeader(token) {
    return { 'Authorization': `Bearer ${token}` };
}

// Test data creation helpers
export async function createTestLeave(user, leaveData = {}) {
    return prisma.leave.create({
        data: {
            ...testData.leave,
            ...leaveData,
            userId: user.id
        }
    });
}

export async function createTestIncident(user, incidentData = {}) {
    return prisma.incident.create({
        data: {
            ...testData.incident,
            ...incidentData,
            reporterId: user.id
        }
    });
}

export async function createTestOperation(user, operationData = {}) {
    return prisma.operation.create({
        data: {
            ...testData.operation,
            ...operationData,
            requesterId: user.id
        }
    });
}

// Test setup helpers
export async function setupTestUsers() {
    const admin = await createTestUserWithRole(roles.ADMIN);
    const supervisor = await createTestUserWithRole(roles.SUPERVISOR);
    const employee = await createTestUserWithRole(roles.EMPLOYEE);

    return {
        admin,
        supervisor,
        employee,
        adminToken: generateAuthToken(admin),
        supervisorToken: generateAuthToken(supervisor),
        employeeToken: generateAuthToken(employee)
    };
}

// Request helpers
export function authHeader(token) {
    return { Authorization: `Bearer ${token}` };
}

// Validation helpers
export function validateUserResponse(data) {
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
            name: expect.any(String),
            role: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    );
    expect(data).not.toHaveProperty('password');
}

export function validateLeaveResponse(data) {
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            startDate: expect.any(String),
            endDate: expect.any(String),
            reason: expect.any(String),
            type: expect.any(String),
            status: expect.any(String),
            userId: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    );
}

export function validateIncidentResponse(data) {
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            severity: expect.any(String),
            status: expect.any(String),
            reporterId: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    );
}

export function validateOperationResponse(data) {
    expect(data).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
            type: expect.any(String),
            priority: expect.any(String),
            status: expect.any(String),
            requesterId: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        })
    );
}

// Response helpers
export function expectSuccess(response, statusCode = 200) {
    expect(response.status).toBe(statusCode);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    return response.body.data;
}

export function expectError(response, statusCode = 400) {
    expect(response.status).toBe(statusCode);
    expect(response.body).toHaveProperty('error');
    return response.body.error;
}

// Date helpers
export function getFutureDate(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
}

// Pagination helpers
export function validatePaginatedResponse(response) {
    expect(response.body).toEqual(
        expect.objectContaining({
            data: expect.any(Array),
            meta: expect.objectContaining({
                total: expect.any(Number),
                page: expect.any(Number),
                limit: expect.any(Number),
                totalPages: expect.any(Number)
            })
        })
    );
}

// Mock data generators
export function generateMockLeaves(count = 1) {
    return Array(count).fill(null).map((_, index) => ({
        ...testData.leave,
        startDate: getFutureDate(index * 7),
        endDate: getFutureDate(index * 7 + 7),
        reason: `Test Leave ${index + 1}`
    }));
}

export function generateMockIncidents(count = 1) {
    return Array(count).fill(null).map((_, index) => ({
        ...testData.incident,
        title: `Test Incident ${index + 1}`,
        description: `Test Description ${index + 1}`
    }));
}

export function generateMockOperations(count = 1) {
    return Array(count).fill(null).map((_, index) => ({
        ...testData.operation,
        title: `Test Operation ${index + 1}`,
        description: `Test Description ${index + 1}`
    }));
}
