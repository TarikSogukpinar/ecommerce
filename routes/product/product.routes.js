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
  '/getProductById/:id',
  verifyToken,
  tryCatch(productController.getProductById),
)

router.get(
  '/searchProducts/:key',
  verifyToken,
  tryCatch(productController.searchProducts),
)

router.post(
  '/createProduct',
  verifyToken,
  tryCatch(productController.createProduct),
)

router.put(
  '/updateProduct/:id',
  verifyToken,
  tryCatch(productController.updateProduct),
)

router.delete(
  '/deleteProductById/:id',
  verifyToken,
  tryCatch(productController.deleteProductById),
)

router.get(
  '/getCheapestFiveProducts',
  tryCatch(productController.getCheapestFiveProducts),
)

router.get(
  '/getExpensiveFiveProducts',
  tryCatch(productController.getExpensiveFiveProducts),
)

router.get(
  '/getRecentlyAddedProducts',
  tryCatch(productController.getRecentlyAddedProducts),
)

export default router
