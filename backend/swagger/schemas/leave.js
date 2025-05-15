/**
 * @swagger
 * components:
 *   schemas:
 *     Leave:
 *       type: object
 *       required:
 *         - userId
 *         - startDate
 *         - endDate
 *         - type
 *         - reason
 *       properties:
 *         id:
 *           type: string
 *           description: The leave request's unique identifier
 *         userId:
 *           type: string
 *           description: ID of the user requesting leave
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: Leave start date and time
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: Leave end date and time
 *         type:
 *           type: string
 *           enum: [ANNUAL, SICK, MATERNITY, PATERNITY, UNPAID]
 *           description: Type of leave
 *         reason:
 *           type: string
 *           description: Reason for requesting leave
 *         additionalNotes:
 *           type: string
 *           description: Optional additional information
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED]
 *           default: PENDING
 *           description: Current status of the leave request
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     CreateLeaveInput:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *         - type
 *         - reason
 *       properties:
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         type:
 *           type: string
 *           enum: [ANNUAL, SICK, MATERNITY, PATERNITY, UNPAID]
 *         reason:
 *           type: string
 *         additionalNotes:
 *           type: string
 * 
 *     UpdateLeaveInput:
 *       type: object
 *       properties:
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         type:
 *           type: string
 *           enum: [ANNUAL, SICK, MATERNITY, PATERNITY, UNPAID]
 *         reason:
 *           type: string
 *         additionalNotes:
 *           type: string
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED]
 */
