/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           default: false
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *             message:
 *               type: string
 *             details:
 *               type: array
 *               items:
 *                 type: string
 * 
 *     Success:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           default: true
 *         data:
 *           type: object
 *         message:
 *           type: string
 * 
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         limit:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         total:
 *           type: integer
 *         totalPages:
 *           type: integer
 *
 *   parameters:
 *     pageParam:
 *       in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *       description: Page number to fetch
 *     
 *     limitParam:
 *       in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 10
 *       description: Number of items per page
 *     
 *     sortParam:
 *       in: query
 *       name: sort
 *       schema:
 *         type: string
 *       description: Sort field and order (e.g. "createdAt:desc")
 *     
 *     searchParam:
 *       in: query
 *       name: search
 *       schema:
 *         type: string
 *       description: Search term to filter results
 * 
 *   responses:
 *     Unauthorized:
 *       description: Authentication token is missing or invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     Forbidden:
 *       description: User doesn't have necessary permissions
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     NotFound:
 *       description: Requested resource was not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     BadRequest:
 *       description: Invalid input parameters
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     
 *     ValidationError:
 *       description: Input validation failed
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 */
