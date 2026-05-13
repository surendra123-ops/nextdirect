import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { updateProfileRules } from "../validators/user.validators.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/me", userController.getMe);
router.patch("/me", updateProfileRules, validateRequest, userController.updateMe);

export default router;
