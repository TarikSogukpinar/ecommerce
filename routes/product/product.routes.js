import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import productController from '../../controllers/product/productController.js'
const router = Router()

router.get('/getAllProducts', verifyToken, productController.getAllProducts)

router.get('/searchProducts', verifyToken, productController.searchProducts)

router.post(
  '/createProduct',
  verifyToken,
  verifyRoles('seller'),
  productController.createProduct,
)

router.put(
  '/updateProduct/:id',
  verifyToken,
  verifyRoles('seller'),
  productController.updateProduct,
)

export default router
