import {Router} from 'express'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'
import cartController from '../../controllers/cart/cartController.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
    '/addToCartItem/:userId/:productId',
    verifyToken,
    tryCatch(cartController.addToCartItem),
    /*
    #swagger.security = [{
          "apiKeyAuth": []
    }]
   #swagger.tags = ['Cart']
   #swagger.path = '/cart/addToCartItem/{userId}/{productId}'
    */
)

router.get(
    '/userCart/:userId',
    verifyToken,
    tryCatch(cartController.getUserCart),
    /*
   #swagger.security = [{
         "apiKeyAuth": []
   }]
  #swagger.tags = ['Cart']
  #swagger.path = '/cart/userCart/{userId}'
   */
)

router.delete(
    '/cartItem/:userId/:productId',
    verifyToken,
    tryCatch(cartController.deleteCartItem),
    /*
   #swagger.security = [{
         "apiKeyAuth": []
   }]
  #swagger.tags = ['Cart']
  #swagger.path = '/cart/cartItem/{userId}/{productId}'
   */
)

router.delete(
    '/userCart/:userId',
    verifyToken,
    tryCatch(cartController.deleteUserCart),
    /*
  #swagger.security = [{
        "apiKeyAuth": []
  }]
 #swagger.tags = ['Cart']
 #swagger.path = '/cart/userCart/{userId}'
  */
)

export default router
