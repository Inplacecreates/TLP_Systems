import { prisma } from '../db/db.js';

export const submitLeaveRequest = async (req, res) => {
    try {
        const { startDate, endDate, type, reason, additionalNotes } = req.body;
        const userId = req.user.id;

        const leave = await prisma.leave.create({
            data: {
                userId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                type,
                reason,
                additionalNotes,
                status: 'PENDING'
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        department: true
                    }
                }
            }
        });

        // Create notification for supervisor
        await prisma.notification.create({
            data: {
                userId, // This should be supervisor's ID in real implementation
                message: `New leave request from ${leave.user.firstName} ${leave.user.lastName} (${leave.user.department})`
            }
        });

        res.status(201).json(leave);
    } catch (error) {
        console.error('Submit leave request error:', error);
        res.status(500).json({
            message: 'Error submitting leave request'
        });
    }
};

export const getMyLeaves = async (req, res) => {
    try {
        const leaves = await prisma.leave.findMany({
            where: {
                userId: req.user.id
            },
            include: {
                approvals: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(leaves);
    } catch (error) {
        console.error('Get leaves error:', error);
        res.status(500).json({
            message: 'Error fetching leaves'
        });
    }
};

export const reportIncident = async (req, res) => {
    try {
        const { title, description, severity = 'MEDIUM' } = req.body;
        const userId = req.user.id;

        const incident = await prisma.incident.create({
            data: {
                userId,
                title,
                description,
                severity,
                status: 'PENDING'
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        department: true
                    }
                }
            }
        });

        // Create notification for admin/supervisor
        await prisma.notification.create({
            data: {
                userId, // This should be admin/supervisor ID in real implementation
                message: `New incident reported: ${incident.title}`
            }
        });

        res.status(201).json(incident);
    } catch (error) {
        console.error('Report incident error:', error);
        res.status(500).json({
            message: 'Error reporting incident'
        });
    }
};

export const getMyIncidents = async (req, res) => {
    try {
        const incidents = await prisma.incident.findMany({
            where: {
                userId: req.user.id
            },
            orderBy: {
                reportedAt: 'desc'
            }
        });

        res.json(incidents);
    } catch (error) {
        console.error('Get incidents error:', error);
        res.status(500).json({
            message: 'Error fetching incidents'
        });
    }
};

export const submitOperationRequest = async (req, res) => {
    try {
        const { requestType, description, priority = 'MEDIUM' } = req.body;
        const userId = req.user.id;

        const request = await prisma.operationRequest.create({
            data: {
                userId,
                requestType,
                description,
                priority,
                status: 'PENDING'
            },
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        department: true
                    }
                }
            }
        });

        // Create notification
        await prisma.notification.create({
            data: {
                userId, // This should be approver's ID in real implementation
                message: `New operation request: ${request.requestType}`
            }
        });

        res.status(201).json(request);
    } catch (error) {
        console.error('Submit operation request error:', error);
        res.status(500).json({
            message: 'Error submitting operation request'
        });
    }
};
