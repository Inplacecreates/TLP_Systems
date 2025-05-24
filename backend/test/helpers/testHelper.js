import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/index.js';
import config from '../../config/index.js';

/**
 * Test data factories
 */
export const factories = {
    async createUser(data = {}) {
        const defaultPassword = await bcrypt.hash('password123', 10);
        return prisma.user.create({
            data: {
                email: `user${Date.now()}@test.com`,
                password: defaultPassword,
                firstName: 'Test',
                lastName: 'User',
                role: 'EMPLOYEE',
                department: 'Testing',
                status: 'ACTIVE',
                contractType: 'PERMANENT',
                ...data
            }
        });
    },

    createAuthToken(user) {
        return jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            config.security.jwtSecret,
            { expiresIn: config.security.jwtExpiry }
        );
    },

    // Add more factories as needed for other entities
    async createLeaveRequest(user, data = {}) {
        return prisma.leave.create({
            data: {
                userId: user.id,
                startDate: new Date(),
                endDate: new Date(Date.now() + 86400000),
                type: 'ANNUAL',
                reason: 'Test leave request',
                status: 'PENDING',
                ...data
            }
        });
    },

    async createIncident(user, data = {}) {
        return prisma.incident.create({
            data: {
                userId: user.id,
                title: 'Test Incident',
                description: 'Test description',
                severity: 'LOW',
                status: 'PENDING',
                ...data
            }
        });
    }
};

/**
 * Test request helper that simulates Express request/response objects
 */
export const mockRequestResponse = () => {
    const req = {
        body: {},
        query: {},
        params: {},
        headers: {},
        user: null
    };

    const res = {
        data: null,
        code: null,
        status(code) {
            this.code = code;
            return this;
        },
        json(data) {
            this.data = data;
            return this;
        }
    };

    return { req, res };
};

/**
 * Clean specific tables in the database
 */
export const cleanTable = async (tableName) => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tableName}" CASCADE;`);
};

/**
 * Helper to check if two dates are the same (ignoring milliseconds)
 */
export const datesAreEqual = (date1, date2) => {
    return new Date(date1).getTime() === new Date(date2).getTime();
};

/**
 * Helper to verify object has required properties
 */
export const hasRequiredProperties = (obj, properties) => {
    return properties.every(prop => obj.hasOwnProperty(prop));
};