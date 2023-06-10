import { Router } from 'express'
import passwordResetController from '../../controllers/user/passwordResetController.js'
import updatePasswordController from '../../controllers/user/updatePasswordController.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.put(
  '/updatePassword/:id',
  verifyToken,
  tryCatch(updatePasswordController.updatePassword),
)
router.post('/reset-password', tryCatch(passwordResetController.passwordReset))

export default router
