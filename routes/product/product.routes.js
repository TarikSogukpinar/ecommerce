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
    /*
#swagger.security = [{
      "apiKeyAuth": []
}]
#swagger.tags = ['Product']
#swagger.path = '/product/allProducts'
*/
)

router.get(
  '/productById/:id',
  verifyToken,
  tryCatch(productController.getProductById),
    /*
#swagger.security = [{
  "apiKeyAuth": []
}]
#swagger.tags = ['Product']
#swagger.path = '/product/productById/{id}'
*/
)

router.get(
  '/searchProducts/:key',
  verifyToken,
  tryCatch(productController.searchProducts),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Product']
#swagger.path = '/product/searchProducts/{key}'
*/
)

router.post(
  '/createProduct',
  verifyToken,
  tryCatch(productController.createProduct),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Product']
#swagger.path = '/product/createProduct'
*/
)

router.put(
  '/product/:id',
  verifyToken,
  tryCatch(productController.updateProduct),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Product']
#swagger.path = '/product/product/{id}'
*/
)

router.delete(
  '/productById/:id',
  verifyToken,
  tryCatch(productController.deleteProductById),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Product']
#swagger.path = '/product/productById/{id}'
*/
)

router.get(
  '/cheapestFiveProducts',
  tryCatch(productController.getCheapestFiveProducts),
    /*
#swagger.tags = ['Product']
#swagger.path = '/product/cheapestFiveProducts'
*/
)

router.get(
  '/expensiveFiveProducts',
  tryCatch(productController.getExpensiveFiveProducts),
    /*
#swagger.tags = ['Product']
#swagger.path = '/product/expensiveFiveProducts'
*/
)

router.get(
  '/recentlyAddedProducts',
  tryCatch(productController.getRecentlyAddedProducts),
    /*
#swagger.tags = ['Product']
#swagger.path = '/product/recentlyAddedProducts'
*/
)

export default router
