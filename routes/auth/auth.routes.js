import {Router} from 'express'
import loginController from '../../controllers/auth/loginController.js'
import registerController from '../../controllers/auth/registerController.js'
import logoutController from '../../controllers/auth/logoutController.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     description: Registers a new user
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
 *     tags: [Auth]
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
router.post('/register', tryCatch(registerController.registerUser))

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     description: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 */
router.post('/login', tryCatch(loginController.loginUser))

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     description: Logs out a user
 *     tags: [Auth]
 *     parameters:
 *       - in: cookie
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: User authentication token
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get('/logout', verifyToken, tryCatch(logoutController.logoutUser))

/**
 * @swagger
 * /api/v1/auth/check:
 *   get:
 *     description: Health check of the service
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Service is up
 */
router.get('/check', (req, res) => {
    res.json('Health Check')
})

export default router
