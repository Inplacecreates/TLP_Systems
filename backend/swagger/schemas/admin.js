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
 */