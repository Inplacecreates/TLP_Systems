/**
 * @swagger
 * components:
 *   schemas:
 *     AdminResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates if the operation was successful
 *         data:
 *           type: object
 *           description: The response data
 *         message:
 *           type: string
 *           description: Response message
 * 
 *     SystemStats:
 *       type: object
 *       properties:
 *         statistics:
 *           type: object
 *           properties:
 *             totalUsers:
 *               type: integer
 *               description: Total number of users in the system
 *             pendingLeaves:
 *               type: integer
 *               description: Number of pending leave requests
 *             pendingIncidents:
 *               type: integer
 *               description: Number of pending incident reports
 *             pendingOperations:
 *               type: integer
 *               description: Number of pending operation requests
 * 
 *     AdminUserCreate:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - department
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (will be hashed)
 *           minLength: 8
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         department:
 *           type: string
 *           description: User's department
 *         role:
 *           type: string
 *           enum: [ADMIN, EMPLOYEE, HR, FINANCE, SUPERVISOR]
 *           default: EMPLOYEE
 *           description: User's role in the system
 * 
 *     AdminUserUpdate:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         department:
 *           type: string
 *           description: User's department
 *         role:
 *           type: string
 *           enum: [ADMIN, EMPLOYEE, HR, FINANCE, SUPERVISOR]
 *           description: User's role in the system
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           description: User's account status
 * 
 *     PasswordReset:
 *       type: object
 *       required:
 *         - newPassword
 *       properties:
 *         newPassword:
 *           type: string
 *           format: password
 *           description: New password for the user
 *           minLength: 8
 * 
 *     AuditLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the audit log entry
 *         action:
 *           type: string
 *           description: The action that was performed
 *           example: USER_CREATED
 *         details:
 *           type: object
 *           description: Additional details about the action
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID of the user who performed the action
 *         user:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the action was performed
 * 
 *     AuditLogFilters:
 *       type: object
 *       properties:
 *         action:
 *           type: string
 *           description: Filter by action type
 *         startDate:
 *           type: string
 *           format: date
 *           description: Filter logs from this date
 *         endDate:
 *           type: string
 *           format: date
 *           description: Filter logs until this date
 * 
 *     AdminPaginatedResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             items:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             pagination:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 * 
 *     AdminBulkAction:
 *       type: object
 *       required:
 *         - userIds
 *         - action
 *       properties:
 *         userIds:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           description: Array of user IDs to perform action on
 *         action:
 *           type: string
 *           enum: [ACTIVATE, DEACTIVATE, DELETE]
 *           description: Action to perform on selected users
 * 
 *   parameters:
 *     adminUserFilters:
 *       in: query
 *       name: filters
 *       schema:
 *         type: object
 *         properties:
 *           role:
 *             type: string
 *             enum: [ADMIN, EMPLOYEE, HR, FINANCE, SUPERVISOR]
 *           status:
 *             type: string
 *             enum: [ACTIVE, INACTIVE]
 *           department:
 *             type: string
 *           search:
 *             type: string
 *             description: Search in firstName, lastName, email
 * 
 *   responses:
 *     AdminForbidden:
 *       description: Access denied - requires admin privileges
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: Insufficient permissions
 * 
 * /v1/admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: Get all users
 *     description: Retrieve a list of users with pagination and filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/adminUserFilters'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminPaginatedResponse'
 *       403:
 *         $ref: '#/components/responses/AdminForbidden'
 * 
 *   post:
 *     tags: [Admin]
 *     summary: Create a new user
 *     description: Create a new user with specified role and permissions
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       403:
 *         $ref: '#/components/responses/AdminForbidden'
 * 
 *   delete:
 *     tags: [Admin]
 *     summary: Bulk delete users
 *     description: Delete multiple users at once
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminBulkAction'
 *     responses:
 *       200:
 *         description: Users deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       403:
 *         $ref: '#/components/responses/AdminForbidden'
 * 
 * /v1/admin/users/{id}:
 *   get:
 *     tags: [Admin]
 *     summary: Get user details
 *     description: Get detailed information about a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *   patch:
 *     tags: [Admin]
 *     summary: Update user
 *     description: Update user details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminUserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 *   delete:
 *     tags: [Admin]
 *     summary: Delete user
 *     description: Delete a specific user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 * /v1/admin/users/{id}/reset-password:
 *   post:
 *     tags: [Admin]
 *     summary: Reset user password
 *     description: Reset a user's password
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PasswordReset'
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminResponse'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 * 
 * /v1/admin/audit-logs:
 *   get:
 *     tags: [Admin]
 *     summary: Get audit logs
 *     description: Get system audit logs with filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Audit logs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AdminPaginatedResponse'
 *       403:
 *         $ref: '#/components/responses/AdminForbidden'
 * 
 * /v1/admin/stats:
 *   get:
 *     tags: [Admin]
 *     summary: Get system statistics
 *     description: Get overview of system statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SystemStats'
 *       403:
 *         $ref: '#/components/responses/AdminForbidden'
 * 
 */