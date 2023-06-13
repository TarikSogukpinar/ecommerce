import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'
import favoriteController from '../../controllers/favorite/favoriteController.js'

const router = Router()

router.post(
  '/addFavorite/:userId/:productId',
  verifyToken,
  tryCatch(favoriteController.addFavorite),
)

router.get(
  '/getFavoriteProducts/:userId',
  verifyToken,
  tryCatch(favoriteController.getFavoriteProducts),
)

router.delete(
  '/deleteFavorite/:userId/:productId',
  tryCatch(favoriteController.deleteFavoriteProducts),
)

export default router
