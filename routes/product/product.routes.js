import { Router } from "express";
import { verifyToken } from "../../middleware/verifyTokens/verifyTokens.js";
import { verifyRoles } from "../../middleware/verifyRoles/verifyRoles.js";
import createProductController from "../../controllers/product/createProductController.js";
import updateProductController from "../../controllers/product/updateProductController.js";
const router = Router();

router.post(
  "/createProduct",
  verifyToken,
  verifyRoles("seller"),
  createProductController.createProduct
);

router.put(
  "/updateProduct/:id",
  verifyToken,
  verifyRoles("seller"),
  updateProductController.updateProduct
);

export default router;
