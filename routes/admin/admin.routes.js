import {Router} from 'express'
import adminController from '../../controllers/admin/adminController.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()


router.post(
    '/createNewUser',
    verifyToken,
    // verifyRoles('admin'),
    tryCatch(adminController.createNewUser),
)


router.get(
    /* #swagger.security = [{
         "apiKeyAuth": []
    }] */
    '/allUsers',
    verifyToken,
    // verifyRoles('admin'),
    tryCatch(adminController.getAllUsers),
)


router.get(
    '/userById/:id',
    verifyToken,
    verifyRoles('admin'),
    tryCatch(adminController.getUserById),
)


router.put(
    '/userById/:id',
    verifyToken,
    verifyRoles('admin'),
    tryCatch(adminController.updateUserById),
)


router.delete(
    '/userById/:id',
    verifyToken,
    verifyRoles('admin'),
    tryCatch(adminController.deleteUserById),
)


router.put(
    '/userRole/:id',
    verifyToken,
    tryCatch(adminController.updateUserRole),
)

export default router
