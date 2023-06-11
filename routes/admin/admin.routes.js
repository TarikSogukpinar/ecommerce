import { Router } from 'express'
import adminController from '../../controllers/admin/adminController.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.get(
  '/getAllUsers',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.getAllUsers),
)

router.get(
  '/getUserById/:id',
  verifyToken,
  tryCatch(adminController.getUserById),
)

export default router
