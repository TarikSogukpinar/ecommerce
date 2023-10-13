import { Router } from 'express'
import userController from '../../controllers/user/userController.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.put(
  '/password/:id',
  verifyToken,
  tryCatch(userController.updatePassword),
)
router.post('/reset-password', tryCatch(userController.passwordReset))

router.delete(
  '/userAccountDeleted/:id',
  verifyToken,
  tryCatch(userController.userAccountDeleted),
)

export default router
