import { Router } from "express";
import { verifyToken } from "../../middleware/verifyTokens/verifyTokens.js";
import { verifyRoles } from "../../middleware/verifyRoles/verifyRoles.js";
import createProductController from "../../controllers/product/createProductController.js";

const router = Router();

router.post(
  "/createProduct",
  verifyToken,
  verifyRoles("seller"),
  createProductController.createProduct
);

export default router;
