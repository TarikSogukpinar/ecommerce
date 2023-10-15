import {Router} from 'express'
import userController from '../../controllers/user/userController.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

router.put(
    '/password/:id',
    verifyToken,
    tryCatch(userController.updatePassword),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['User']
#swagger.path = '/user/password/{id}'
*/
)
router.post('/reset-password', tryCatch(userController.passwordReset)
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['User']
#swagger.path = '/user/reset-password'
*/
)

router.delete(
    '/userAccountDeleted/:id',
    verifyToken,
    tryCatch(userController.userAccountDeleted),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['User']
#swagger.path = '/user/userAccountDeleted/{id}'
*/
)

export default router
