/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - role
 *         - department
 *         - contractType
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         firstName:
 *           type: string
 *           description: User's first name
 *         lastName:
 *           type: string
 *           description: User's last name
 *         phoneNumber:
 *           type: string
 *           description: Optional phone number
 *         role:
 *           type: string
 *           enum: [ADMIN, EMPLOYEE, FINANCE, HR, SUPERVISOR]
 *           description: User's role in the system
 *         department:
 *           type: string
 *           description: User's department
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *           default: ACTIVE
 *           description: User's account status
 *         contractType:
 *           type: string
 *           enum: [PERMANENT, CONTRACT, LOCUM]
 *           description: Type of employment contract
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *         - role
 *         - department
 *         - contractType
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         role:
 *           type: string
 *           enum: [ADMIN, EMPLOYEE, FINANCE, HR, SUPERVISOR]
 *         department:
 *           type: string
 *         contractType:
 *           type: string
 *           enum: [PERMANENT, CONTRACT, LOCUM]
 * 
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phoneNumber:
 *           type: string
 *         department:
 *           type: string
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE]
 *         contractType:
 *           type: string
 *           enum: [PERMANENT, CONTRACT, LOCUM]
 */
