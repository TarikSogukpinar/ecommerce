import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import discountController from '../../controllers/discount/discountController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.put(
  '/productDiscount/:id',
  verifyToken,
  tryCatch(discountController.updateProductDiscount),
)

router.put(
  '/topExpensiveProductDiscount',
  verifyToken,
  tryCatch(discountController.updateTopExpensiveProductDiscount),
)

export default router
