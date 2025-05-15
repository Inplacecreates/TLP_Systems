import express from 'express';
import { authenticate } from '../../middleware/auth.js';
import {
    submitLeaveRequest,
    getMyLeaves,
    reportIncident,
    getMyIncidents,
    submitOperationRequest
} from '../../controllers/employeeController.js';

const router = express.Router();

/**
 * @swagger
 * /v1/employee:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Get a list of employees
 *     description: Retrieve a paginated list of employees. Requires admin or HR role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/sortParam'
 *       - $ref: '#/components/parameters/searchParam'
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ADMIN, EMPLOYEE, FINANCE, HR, SUPERVISOR]
 *         description: Filter by role
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/User'
 *                         pagination:
 *                           $ref: '#/components/schemas/Pagination'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /v1/employee/{id}:
 *   get:
 *     tags:
 *       - Employees
 *     summary: Get employee details
 *     description: Get detailed information about an employee.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /v1/employee/{id}:
 *   patch:
 *     tags:
 *       - Employees
 *     summary: Update employee details
 *     description: Update information about an employee. Requires admin or HR role.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Success'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       422:
 *         $ref: '#/components/responses/ValidationError'
 */

// All routes require authentication
router.use(authenticate);

// Leave management
router.post('/leave', submitLeaveRequest);
router.get('/leaves', getMyLeaves);

// Incident reporting
router.post('/incident', reportIncident);
router.get('/incidents', getMyIncidents);

// Operation requests
router.post('/operation-request', submitOperationRequest);

export default router;
