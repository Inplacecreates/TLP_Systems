import { prisma } from '../db/db.js';

// Base controller with common CRUD operations
export const baseController = {
    // Generic find by ID
    async findById(model, id, include = {}) {
        return prisma[model].findUnique({
            where: { id },
            include
        });
    },

    // Generic find many with filters
    async findMany(model, filters = {}, include = {}, pagination = {}) {
        const { skip, take } = pagination;
        return prisma[model].findMany({
            where: filters,
            include,
            skip,
            take,
            orderBy: { createdAt: 'desc' }
        });
    },

    // Generic create
    async create(model, data, include = {}) {
        return prisma[model].create({
            data,
            include
        });
    },

    // Generic update
    async update(model, id, data, include = {}) {
        return prisma[model].update({
            where: { id },
            data,
            include
        });
    },

    // Generic delete
    async delete(model, id) {
        return prisma[model].delete({
            where: { id }
        });
    },

    // Generic status update
    async updateStatus(model, id, status) {
        return prisma[model].update({
            where: { id },
            data: { status }
        });
    }
};

// Common notification function
export const createNotification = async (userId, message, type = 'INFO') => {
    return prisma.notification.create({
        data: {
            userId,
            message,
            type
        }
    });
};

// Common audit log function
export const createAuditLog = async (userId, action, details = {}) => {
    return prisma.auditLog.create({
        data: {
            userId,
            action,
            details: JSON.stringify(details)
        }
    });
};
