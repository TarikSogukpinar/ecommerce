import { Router } from 'express'
import supportController from '../../controllers/support/supportController.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'

const router = Router()

router.post(
  '/createTicket',
  verifyToken,
  tryCatch(supportController.createTicket),
)
router.get(
  '/getAllTickets',
  verifyToken,
  verifyRoles('support'),
  tryCatch(supportController.getAllTickets),
)

export default router
