import { Router } from 'express'
import adminController from '../../controllers/admin/adminController.js'
import { verifyToken } from '../../middleware/verifyTokens/verifyTokens.js'
import { verifyRoles } from '../../middleware/verifyRoles/verifyRoles.js'
import { tryCatch } from '../../helpers/utils/tryCatch.js'

const router = Router()

router.post(
  '/createNewUser',
  verifyToken,
  // verifyRoles('admin'),
  tryCatch(adminController.createNewUser),
  /*
     #swagger.security = [{
           "apiKeyAuth": []
     }]
    #swagger.tags = ['Admin']
    #swagger.path = '/admin/createNewUser'
     */
)

router.get(
  '/allUsers',
  verifyToken,
  // verifyRoles('admin'),
  tryCatch(adminController.getAllUsers),
  /*
      #swagger.security = [{
            "apiKeyAuth": []
      }]
     #swagger.tags = ['Admin']
     #swagger.path = '/admin/allUsers'
      */
)

router.get(
  '/userById/:id',
  verifyToken,
  tryCatch(adminController.getUserById),
  /*
    #swagger.security = [{
          "apiKeyAuth": []
    }]
   #swagger.tags = ['Admin']
   #swagger.path = '/admin/userById/{id}'
    */
)

router.put(
  '/userById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.updateUserById),
  /*
  #swagger.security = [{
        "apiKeyAuth": []
  }]
  #swagger.tags = ['Admin']
  #swagger.path = '/admin/userById/{id}'
  */
)

router.delete(
  '/userById/:id',
  verifyToken,
  verifyRoles('admin'),
  tryCatch(adminController.deleteUserById),
  /*
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  #swagger.tags = ['Admin']
  #swagger.path = '/admin/userById/{id}'
  */
)

router.put(
  '/userRole/:id',
  verifyToken,
  tryCatch(adminController.updateUserRole),
  /*
  #swagger.security = [{
    "apiKeyAuth": []
  }]
  #swagger.tags = ['Admin']
  #swagger.path = '/admin/userRole/{id}'
  */
)

export default router
