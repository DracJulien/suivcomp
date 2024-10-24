import { Router } from 'express';
import { createRole } from '../controllers/role.controller';
import { checkRole } from '../middlewares/checkRoles';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the role (e.g., Admin, User)
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad request, missing role name
 *       403:
 *         description: Forbidden, insufficient rights
 *       500:
 *         description: Server error
 */
router.post('/', checkRole('Admin'), createRole);

export default router;
