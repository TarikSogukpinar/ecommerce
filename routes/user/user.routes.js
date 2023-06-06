import { Router } from "express";
import passwordResetController from "../../controllers/user/passwordResetController.js";
import updatePasswordController from "../../controllers/user/updatePasswordController.js";
import { verifyToken } from "../../middleware/verifyTokens/verifyTokens.js";

const router = Router();

router.put(
  "/updatePassword/:id",
  verifyToken,
  updatePasswordController.updatePassword
);
router.post("/reset-password", passwordResetController.passwordReset);


export default router;
