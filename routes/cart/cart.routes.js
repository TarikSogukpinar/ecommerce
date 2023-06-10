import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import cartController from '../../controllers/cart/cartController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
  '/addToCartItem/:userId/:productId',
  verifyToken,
  tryCatch(cartController.addToCartItem),
)

router.get(
  '/getUserCart/:userId',
  verifyToken,
  tryCatch(cartController.getUserCart),
)

router.delete(
  '/deleteCartItem/:userId/:productId',
  verifyToken,
  tryCatch(cartController.deleteCartItem),
)

router.delete(
  '/deleteUserCart/:userId',
  verifyToken,
  tryCatch(cartController.deleteUserCart),
)

export default router
