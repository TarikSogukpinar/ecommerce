import { Router } from 'express'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import categoryController from '../../controllers/category/categoryController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
  '/createCategory',
  verifyToken,
  tryCatch(categoryController.createCategory),
)

router.get(
  '/searchCategory/:key',
  verifyToken,
  tryCatch(categoryController.searchCategory),
)

router.get(
  '/searchCategoryById/:id',
  tryCatch(categoryController.searchCategoryById),
)

export default router
