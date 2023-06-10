import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import cartController from '../../controllers/cart/cartController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
  '/addToCart/:userId/:productId',
  verifyToken,
  tryCatch(cartController.addToCart),
)

router.get(
  '/getUserCart/:userId',
  verifyToken,
  tryCatch(cartController.getUserCart),
)

export default router
