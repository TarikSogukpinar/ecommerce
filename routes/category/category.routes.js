import {Router} from 'express'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'
import categoryController from '../../controllers/category/categoryController.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
    '/createCategory',
    verifyToken,
    tryCatch(categoryController.createCategory),
    /*
   #swagger.security = [{
         "apiKeyAuth": []
   }]
  #swagger.tags = ['Category']
  #swagger.path = '/category/createCategory'
   */
)

router.get(
    '/searchCategory/:key',
    verifyToken,
    tryCatch(categoryController.searchCategory),
    /*
#swagger.security = [{
     "apiKeyAuth": []
}]
#swagger.tags = ['Category']
#swagger.path = '/category/searchCategory/{key}'
*/
)

router.get(
    '/searchCategoryById/:id',
    tryCatch(categoryController.searchCategoryById),
    /*
#swagger.tags = ['Category']
#swagger.path = '/category/searchCategoryById/{id}'
*/
)

router.put('/categoryById/:id', tryCatch(categoryController.updateCategoryById)
    /*
#swagger.tags = ['Category']
#swagger.path = '/category/categoryById/{id}'
*/
)

router.delete(
    '/deleteCategoryById/:id',
    tryCatch(categoryController.deleteCategoryById),
    /*
#swagger.tags = ['Category']
#swagger.path = '/category/deleteCategoryById/{id}'
*/
)

export default router
