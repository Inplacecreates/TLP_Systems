import { baseController } from './baseController.js';
import { prisma } from '../db/db.js';

// Get all employees with pagination and filters
export const getEmployees = async (req, res) => {
    try {
        const { page = 1, limit = 10, department, role, search } = req.query;

        const filters = {
            ...(department && { department }),
            ...(role && { role }),
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: 'insensitive' } },
                    { lastName: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            })
        };

        const result = await baseController.paginate(
            'User',
            filters,
            parseInt(page),
            parseInt(limit)
        );

        res.json(result);
    } catch (error) {
        console.error('Get employees error:', error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await baseController.findById('User', id, {
            leaves: true,
            incidents: true,
            operations: true
        });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        console.error('Get employee error:', error);
        res.status(500).json({ message: 'Error fetching employee' });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate unique email if it's being updated
        if (updateData.email) {
            const isUnique = await baseController.validateUnique('User', 'email', updateData.email, id);
            if (!isUnique) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const employee = await baseController.update('User', id, updateData);

        // Create audit log
        await baseController.createAuditLog(
            req.user.id,
            'EMPLOYEE_UPDATED',
            { employeeId: id, updates: updateData }
        );

        res.json(employee);
    } catch (error) {
        console.error('Update employee error:', error);
        res.status(500).json({ message: 'Error updating employee' });
    }
};

// Submit leave request
export const submitLeaveRequest = async (req, res) => {
    try {
        const { startDate, endDate, type, reason, additionalNotes } = req.body;
        const userId = req.user.id;

        const leave = await baseController.create('Leave', {
            userId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            type,
            reason,
            additionalNotes,
            status: 'PENDING'
        }, {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    department: true
                }
            }
        });

        // Create notification and audit log
        await Promise.all([
            baseController.createNotification(
                userId, // This should be supervisor's ID in real implementation
                `New leave request from ${leave.user.firstName} ${leave.user.lastName} (${leave.user.department})`
            ),
            baseController.createAuditLog(
                userId,
                'LEAVE_REQUEST_CREATED',
                { leaveId: leave.id, type, startDate, endDate }
            )
        ]);

        res.status(201).json(leave);
    } catch (error) {
        console.error('Submit leave request error:', error);
        res.status(500).json({ message: 'Error submitting leave request' });
    }
};

// Get my leaves
export const getMyLeaves = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, startDate, endDate } = req.query;

        let filters = { userId: req.user.id };
        if (status) filters.status = status;

        let result;
        if (startDate && endDate) {
            result = await baseController.findByDateRange(
                'Leave',
                'startDate',
                startDate,
                endDate,
                filters,
                { approvals: true }
            );
        } else {
            result = await baseController.paginate(
                'Leave',
                filters,
                parseInt(page),
                parseInt(limit),
                { approvals: true }
            );
        }

        res.json(result);
    } catch (error) {
        console.error('Get leaves error:', error);
        res.status(500).json({ message: 'Error fetching leaves' });
    }
};

// Report incident
export const reportIncident = async (req, res) => {
    try {
        const { title, description, severity = 'MEDIUM' } = req.body;
        const userId = req.user.id;

        const incident = await baseController.create('Incident', {
            userId,
            title,
            description,
            severity,
            status: 'PENDING'
        }, {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    department: true
                }
            }
        });

        // Create notification and audit log
        await Promise.all([
            baseController.createNotification(
                userId, // This should be admin/supervisor ID in real implementation
                `New incident reported: ${incident.title}`
            ),
            baseController.createAuditLog(
                userId,
                'INCIDENT_REPORTED',
                { incidentId: incident.id, severity, title }
            )
        ]);

        res.status(201).json(incident);
    } catch (error) {
        console.error('Report incident error:', error);
        res.status(500).json({ message: 'Error reporting incident' });
    }
};

// Get my incidents
export const getMyIncidents = async (req, res) => {
    try {
        const { page = 1, limit = 10, severity, status } = req.query;

        const filters = {
            userId: req.user.id,
            ...(severity && { severity }),
            ...(status && { status })
        };

        const result = await baseController.paginate(
            'Incident',
            filters,
            parseInt(page),
            parseInt(limit),
            { approvals: true }
        );

        res.json(result);
    } catch (error) {
        console.error('Get incidents error:', error);
        res.status(500).json({ message: 'Error fetching incidents' });
    }
};

// Submit operation request
export const submitOperationRequest = async (req, res) => {
    try {
        const { requestType, description, priority = 'MEDIUM' } = req.body;
        const userId = req.user.id;

        const operation = await baseController.create('OperationRequest', {
            userId,
            requestType,
            description,
            priority,
            status: 'PENDING'
        });

        // Create notification and audit log
        await Promise.all([
            baseController.createNotification(
                userId, // This should be relevant supervisor/admin ID
                `New operation request: ${requestType}`
            ),
            baseController.createAuditLog(
                userId,
                'OPERATION_REQUEST_CREATED',
                { operationId: operation.id, requestType, priority }
            )
        ]);

        res.status(201).json(operation);
    } catch (error) {
        console.error('Submit operation request error:', error);
        res.status(500).json({ message: 'Error submitting operation request' });
    }
};
