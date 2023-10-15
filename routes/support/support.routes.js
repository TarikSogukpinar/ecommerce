import {Router} from 'express'
import supportController from '../../controllers/support/supportController.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'

const router = Router()

router.post(
    '/createTicket',
    verifyToken,
    tryCatch(supportController.createTicket),
    /*
#swagger.security = [{
     "apiKeyAuth": []
}]
#swagger.tags = ['Support']
#swagger.path = '/support/createTicket'
*/
)
router.get(
    '/allTickets',
    verifyToken,
    verifyRoles('support'),
    tryCatch(supportController.getAllTickets),
    /*
#swagger.security = [{
 "apiKeyAuth": []
}]
#swagger.tags = ['Support']
#swagger.path = '/support/allTickets'
*/
)

export default router
