import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import productController from '../../controllers/product/productController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.get(
  '/getAllProducts',
  verifyToken,
  tryCatch(productController.getAllProducts),
)

router.get(
  '/searchProducts',
  verifyToken,
  tryCatch(productController.searchProducts),
)

router.post(
  '/createProduct',
  verifyToken,
  verifyRoles('seller'),
  tryCatch(productController.createProduct),
)

router.put(
  '/updateProduct/:id',
  verifyToken,
  verifyRoles('seller'),
  tryCatch(productController.updateProduct),
)

export default router
