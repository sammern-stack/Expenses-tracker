import { Router } from "express";
import * as authController from "@/features/controllers/auth.controller.js";

const router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/refresh", authController.refreshTokens);

export default router;
