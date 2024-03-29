import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import reviewController from '../../controllers/review/reviewController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
  '/createReview/:productId',
  verifyToken,
  tryCatch(reviewController.createReview),
    /*
#swagger.security = [{
     "apiKeyAuth": []
}]
#swagger.tags = ['Review']
#swagger.path = '/review/createReview/{productId}'
*/
)

router.get(
  '/reviewByProductId/:productId',
  verifyToken,
  tryCatch(reviewController.getReviewByProductId),
    /*
#swagger.security = [{
  "apiKeyAuth": []
}]
#swagger.tags = ['Review']
#swagger.path = '/review/reviewByProductId/{productId}'
*/
)

export default router
