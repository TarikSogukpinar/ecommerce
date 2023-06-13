import { Router } from 'express'
import orderController from '../../controllers/order/orderController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'

const router = Router()

router.post('/createOrder', verifyToken, tryCatch(orderController.createOrder))

router.get(
  '/searchOrder/:key',
  verifyToken,
  tryCatch(orderController.searchOrder),
)

router.get(
  '/getOrderById/:id',
  verifyToken,
  tryCatch(orderController.getOrderById),
)

router.put(
  '/updateOrder/:id',
  verifyToken,
  tryCatch(orderController.updateOrder),
)

router.put(
  '/cancelOrder/:id',
  verifyToken,
  tryCatch(orderController.cancelOrder),
)

router.put(
  '/updateOrderStatus/:id',
  verifyToken,
  tryCatch(orderController.updateOrderStatus),
)

export default router
