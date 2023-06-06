import { Router } from "express";
import { verifyToken } from "../../middleware/verifyTokens/verifyTokens.js";
import createProductController from "../../controllers/product/createProductController.js";


const router = Router();

router.post(
  "/createProduct",
  verifyToken,
  createProductController.createProduct
);




export default router;