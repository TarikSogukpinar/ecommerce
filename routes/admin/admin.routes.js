import { Router } from 'express'
import adminController from '../../controllers/admin/adminController.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

/**
 * @swagger
 * /api/v1/admin/createNewUser:
 *   post:
 *     description: Create a new user
 *     parameters:
 *         - in: body
 *           name: firstName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: lastName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: email
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: confirmPassword
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.post(
  '/createNewUser',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.createNewUser),
)

/**
 * @swagger
 * /api/v1/admin/allUsers:
 *   get:
 *     description: Get All Users
 *     parameters:
 *         - in: body
 *           name: firstName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: lastName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: email
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: confirmPassword
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.get(
  '/allUsers',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.getAllUsers),
)

/**
 * @swagger
 * /api/v1/admin/userById/:id:
 *   get:
 *     description: Get User By Id
 *     parameters:
 *         - in: body
 *           name: firstName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: lastName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: email
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: confirmPassword
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.get(
  '/userById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.getUserById),
)

/**
 * @swagger
 * /api/v1/admin/userById/:id:
 *   put:
 *     description: Update User By Id
 *     parameters:
 *         - in: body
 *           name: firstName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: lastName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: email
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: confirmPassword
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.put(
  '/userById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.updateUserById),
)

/**
 * @swagger
 * /api/v1/admin/userById/:id:
 *   delete:
 *     description: Delete User By Id
 *     parameters:
 *         - in: body
 *           name: firstName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: lastName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: email
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: confirmPassword
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.delete(
  '/userById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.deleteUserById),
)

/**
 * @swagger
 * /api/v1/admin/userRole/:id:
 *   put:
 *     description: Update User Role
 *     parameters:
 *         - in: body
 *           name: firstName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: lastName
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: email
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: password
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *         - in: path
 *           name: confirmPassword
 *           required: true
 *           type: string
 *           minimum: 3
 *           description: Parameter description in Markdown.
 *     tags: [Admin]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 */
router.put(
  '/userRole/:id',
  verifyToken,
  tryCatch(adminController.updateUserRole),
)

export default router
