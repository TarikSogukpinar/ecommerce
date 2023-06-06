import { Router } from "express";
import loginController from "../../controllers/auth/loginController.js";
import registerController from "../../controllers/auth/registerController.js";
import logoutController from "../../controllers/auth/logoutController.js";
import { verifyToken } from "../../middleware/verifyTokens/verifyTokens.js";

const router = Router();

router.post("/register", registerController.registerUser);
router.post("/login", loginController.loginUser);
router.get("/logout", verifyToken, logoutController.logoutUser);

router.get("/check", (req, res) => {
  res.json("Health Check");
});

export default router;
