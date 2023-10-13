import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import productController from '../../controllers/product/productController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.get(
  '/allProducts',
  verifyToken,
  tryCatch(productController.getAllProducts),
)

router.get(
  '/productById/:id',
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
  '/product/:id',
  verifyToken,
  tryCatch(productController.updateProduct),
)

router.delete(
  '/productById/:id',
  verifyToken,
  tryCatch(productController.deleteProductById),
)

router.get(
  '/cheapestFiveProducts',
  tryCatch(productController.getCheapestFiveProducts),
)

router.get(
  '/expensiveFiveProducts',
  tryCatch(productController.getExpensiveFiveProducts),
)

router.get(
  '/recentlyAddedProducts',
  tryCatch(productController.getRecentlyAddedProducts),
)

export default router
