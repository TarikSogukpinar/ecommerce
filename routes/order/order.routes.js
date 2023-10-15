import {Router} from 'express'
import orderController from '../../controllers/order/orderController.js'
import {tryCatch} from '../../helpers/utils/tryCatch.js'
import {verifyToken} from '../../middleware/verifyTokens/verifyTokens.js'
import {verifyRoles} from '../../middleware/verifyRoles/verifyRoles.js'

const router = Router()

router.post(
    '/createOrder/:productId',
    verifyToken,
    tryCatch(orderController.createOrder),
    /*
#swagger.security = [{
 "apiKeyAuth": []
}]
#swagger.tags = ['Order']
#swagger.path = '/order/createOrder/{productId}'
*/
)

router.get(
    '/searchOrder/:key',
    verifyToken,
    tryCatch(orderController.searchOrder),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Order']
#swagger.path = '/order/searchOrder/{key}'
*/
)

router.get(
    '/orderById/:id',
    verifyToken,
    tryCatch(orderController.getOrderById),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Order']
#swagger.path = '/order/orderById/{id}'
*/
)

router.put('/order/:id', verifyToken, tryCatch(orderController.updateOrder)
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Order']
#swagger.path = '/order/order/{id}'
*/
)

router.put(
    '/cancelOrder/:id',
    verifyToken,
    tryCatch(orderController.cancelOrder),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Order']
#swagger.path = '/order/cancelOrder/{id}'
*/
)

router.put(
    '/orderStatus/:id',
    verifyToken,
    tryCatch(orderController.updateOrderStatus),
    /*
#swagger.security = [{
"apiKeyAuth": []
}]
#swagger.tags = ['Order']
#swagger.path = '/order/orderStatus/{id}'
*/
)

export default router
