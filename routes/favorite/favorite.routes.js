import {Router} from 'express'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'
import favoriteController from '../../controllers/favorite/favoriteController.js'

const router = Router()

router.post(
    '/favorite/:userId/:productId',
    verifyToken,
    tryCatch(favoriteController.addFavorite),
    /*
 #swagger.security = [{
       "apiKeyAuth": []
 }]
#swagger.tags = ['Favorite']
#swagger.path = '/favorite/favorite/{userId}/{productId}'
 */
)

router.get(
    '/favoriteProducts/:userId',
    verifyToken,
    tryCatch(favoriteController.getFavoriteProducts),
    /*
#swagger.security = [{
   "apiKeyAuth": []
}]
#swagger.tags = ['Favorite']
#swagger.path = '/favorite/favoriteProducts/{userId}'
*/
)

router.delete(
    '/favorite/:userId/:productId',
    tryCatch(favoriteController.deleteFavoriteProducts),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Favorite']
#swagger.path = '/favorite/favoriteProducts/{userId}/{productId}'
*/
)

export default router
