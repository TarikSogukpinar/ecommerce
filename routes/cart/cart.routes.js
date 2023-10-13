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
  '/userCart/:userId',
  verifyToken,
  tryCatch(cartController.getUserCart),
)

router.delete(
  '/cartItem/:userId/:productId',
  verifyToken,
  tryCatch(cartController.deleteCartItem),
)

router.delete(
  '/userCart/:userId',
  verifyToken,
  tryCatch(cartController.deleteUserCart),
)

export default router
