import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import discountController from '../../controllers/discount/discountController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.put(
  '/updateProductDiscount/:id/:discount',
  verifyToken,
  tryCatch(discountController.updateProductDiscount),
)

export default router