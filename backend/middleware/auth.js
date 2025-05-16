import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { prisma } from "../db/index.js";
import { hasPermission } from '../utils/rolePermissions.js';
import { unauthorizedResponse, forbiddenResponse } from '../utils/responseHandler.js';

export const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return unauthorizedResponse(res);
        }

        const decoded = jwt.verify(token, config.security.jwtSecret);
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                department: true
            }
        });

        if (!user) {
            return unauthorizedResponse(res, 'User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        return unauthorizedResponse(res, 'Invalid or expired token');
    }
};

export const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!hasPermission(req.user.role, permission)) {
            return forbiddenResponse(res, 'Insufficient permissions');
        }
        next();
    };
};
