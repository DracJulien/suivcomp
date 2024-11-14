import { Router } from 'express';
import { getAllUsers, deleteUser, updateUser, deactivateUser } from '../controllers/user.controller';
import { checkRole, checkRoleOrSelf } from '../middlewares/checkRoles';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Access forbidden
 *       500:
 *         description: Server error
 */
router.get('/',checkRole('Admin'),getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               roleName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Role not found
 *       403:
 *         description: Access forbidden
 *       500:
 *         description: Server error
 */
router.put('/:id',checkRole('Admin'),updateUser);


/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer 
 *     responses:
 *       200:
 *         description: Delete successful
 *       401:
 *         description: Error deleting user
 */
router.delete('/delete/:id', checkRole('Admin'), deleteUser);

/**
 * @swagger
 * /api/users/deactivate/{id}:
 *   patch:
 *     summary: Deactivate a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user to update
 *     responses:
 *       200:
 *         description: Deactivate successful
 *       401:
 *         description: Error deactivating user
 */
router.patch('/deactivate/:id',checkRoleOrSelf('Admin'), deactivateUser)

export default router;
