/**
 * @swagger
 * components:
 *   schemas:
 *     Incident:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         type:
 *           type: string
 *           enum: [SAFETY, HR, FACILITY, IT, OTHER]
 *           description: Type of incident
 *         description:
 *           type: string
 *           description: Detailed description of the incident
 *         location:
 *           type: string
 *           description: Where the incident occurred
 *         severity:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH, CRITICAL]
 *           description: Severity level of the incident
 *         status:
 *           type: string
 *           enum: [OPEN, INVESTIGATING, RESOLVED, ESCALATED]
 *           description: Current status of the incident
 *         witnessDetails:
 *           type: string
 *           description: Details of witnesses if any
 *         followUpActions:
 *           type: string
 *           description: Actions taken or to be taken
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         reportedById:
 *           type: string
 *           format: uuid
 *         assignedToId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *       required:
 *         - type
 *         - description
 *         - location
 *         - severity
 * 
 *     CreateIncidentInput:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [SAFETY, HR, FACILITY, IT, OTHER]
 *         description:
 *           type: string
 *           minLength: 10
 *         location:
 *           type: string
 *           minLength: 1
 *         severity:
 *           type: string
 *           enum: [LOW, MEDIUM, HIGH, CRITICAL]
 *         witnessDetails:
 *           type: string
 *       required:
 *         - type
 *         - description
 *         - location
 *         - severity
 * 
 *     UpdateIncidentInput:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [OPEN, INVESTIGATING, RESOLVED, ESCALATED]
 *         followUpActions:
 *           type: string
 *           minLength: 10
 *         assignedToId:
 *           type: string
 *           format: uuid
 */
