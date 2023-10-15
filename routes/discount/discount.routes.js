import {Router} from 'express'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'
import discountController from '../../controllers/discount/discountController.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

router.put(
    '/productDiscount/:id',
    verifyToken,
    tryCatch(discountController.updateProductDiscount),
    /*
 #swagger.security = [{
       "apiKeyAuth": []
 }]
#swagger.tags = ['Discount']
#swagger.path = '/discount/productDiscount/{id}'
 */
)

router.put(
    '/topExpensiveProductDiscount',
    /*
#swagger.security = [{
      "apiKeyAuth": []
}]
#swagger.tags = ['Discount']
#swagger.path = '/discount/topExpensiveProductDiscount'
*/
    verifyToken,
    tryCatch(discountController.updateTopExpensiveProductDiscount),
)

export default router
