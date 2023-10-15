import {Router} from 'express'
import loginController from '../../controllers/auth/loginController.js'
import registerController from '../../controllers/auth/registerController.js'
import logoutController from '../../controllers/auth/logoutController.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post('/register', tryCatch(registerController.registerUser))
router.post('/login', tryCatch(loginController.loginUser))
router.get('/logout', verifyToken, tryCatch(logoutController.logoutUser))


router.get('/check', verifyToken, (req, res) => {
    res.json('Health Check')
})

export default router
