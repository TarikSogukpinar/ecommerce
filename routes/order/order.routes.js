import { Router } from 'express'
import orderController from '../../controllers/order/orderController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'

const router = Router()

router.post('/createOrder', verifyToken, tryCatch(orderController.createOrder))

export default router
