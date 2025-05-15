/**
 * @swagger
 * components:
 *   schemas:
 *     OperationRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         itemName:
 *           type: string
 *           description: Name of the requested item or service
 *         urgency:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH, CRITICAL]
 *           description: Urgency level of the request
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 *           description: Current status of the request
 *         estimatedCost:
 *           type: number
 *           format: float
 *           description: Estimated cost in the default currency
 *         department:
 *           type: string
 *           description: Requesting department
 *         justification:
 *           type: string
 *           description: Business justification for the request
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         createdById:
 *           type: string
 *           format: uuid
 *         approvedById:
 *           type: string
 *           format: uuid
 *           nullable: true
 *       required:
 *         - itemName
 *         - urgency
 *         - estimatedCost
 *         - department
 *         - justification
 * 
 *     CreateOperationInput:
 *       type: object
 *       properties:
 *         itemName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         urgency:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH, CRITICAL]
 *         estimatedCost:
 *           type: number
 *           minimum: 0
 *         department:
 *           type: string
 *         justification:
 *           type: string
 *           minLength: 10
 *       required:
 *         - itemName
 *         - urgency
 *         - estimatedCost
 *         - department
 *         - justification
 * 
 *     UpdateOperationInput:
 *       type: object
 *       properties:
 *         itemName:
 *           type: string
 *           minLength: 1
 *           maxLength: 255
 *         urgency:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH, CRITICAL]
 *         estimatedCost:
 *           type: number
 *           minimum: 0
 *         justification:
 *           type: string
 *           minLength: 10
 */
