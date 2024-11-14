import { Router } from 'express';
import { createRole,updateRole, deleteRole } from '../controllers/role.controller';
import { checkRole } from '../middlewares/checkRoles';

const router = Router();

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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

/**
 * @swagger
 * /api/roles/{role}:
 *   patch:
 *     summary: Update a role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: integer
 *         description: Name of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the role
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedRole:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *       400:
 *         description: Role name is required
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Access forbidden - insufficient rights
 *       500:
 *         description: Error updating role
 */
router.patch('/:role', checkRole('Admin'), updateRole);

/**
 * @swagger
 * /api/roles/{role}:
 *   delete:
 *     summary: Delete a role
 *     tags:
 *       - Roles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the role to delete
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Access forbidden - insufficient rights
 *       500:
 *         description: Error deleting role
 */
router.delete('/:role', checkRole('Admin'), deleteRole);
export default router;
