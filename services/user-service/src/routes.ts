import { authenticateToken, validateRequest } from "../../../shared/middleware/index.js";
import * as userController from "./userController.js";
import { Router } from "express";
import { updateProfileSchema } from "./validation.js";

const router = Router();

// Protected routes (requires authentication)
router.get("/profile", authenticateToken, userController.getProfile);
router.put("/profile", authenticateToken, validateRequest(updateProfileSchema), userController.updateProfile);
router.delete("/profile", authenticateToken, userController.deleteProfile);

export default router;