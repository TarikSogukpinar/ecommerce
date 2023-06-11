import { Router } from 'express'
import adminController from '../../controllers/admin/adminController.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
  '/createNewUser',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.createNewUser),
)

router.get(
  '/getAllUsers',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.getAllUsers),
)

router.get(
  '/getUserById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.getUserById),
)

router.put(
  '/updateUserById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.updateUserById),
)

router.delete(
  '/deleteUserById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.deleteUserById),
)

export default router
