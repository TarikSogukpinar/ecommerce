import {Router} from 'express'
import loginController from '../../controllers/auth/loginController.js'
import registerController from '../../controllers/auth/registerController.js'
import logoutController from '../../controllers/auth/logoutController.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
    '/register',
    tryCatch(registerController.registerUser),
    /*
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/register'
     */
)
router.post(
    '/login',
    tryCatch(loginController.loginUser),
    /*
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/login'
     */
)
router.get(
    '/logout',
    verifyToken,
    tryCatch(logoutController.logoutUser),
    /*
    #swagger.tags = ['Auth']
    #swagger.path = '/auth/logout'
     */
)

router.get('/check', verifyToken, (req, res) => {
    res.json('Health Check')
    /*
     #swagger.security = [{
       "apiKeyAuth": []
 }]
   #swagger.tags = ['Health Check']
    #swagger.path = '/'
    */
})

export default router
