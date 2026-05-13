import { Router } from "express";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { registerRules, loginRules, googleRules } from "../validators/auth.validators.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", authLimiter, registerRules, validateRequest, authController.register);
router.post("/login", authLimiter, loginRules, validateRequest, authController.login);
router.post("/google", authLimiter, googleRules, validateRequest, authController.google);
router.post("/refresh", authLimiter, authController.refresh);
router.post("/logout", requireAuth, authController.logout);

export default router;
