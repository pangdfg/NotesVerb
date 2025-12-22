
import { Router } from "express";
import * as tagController from "./tagsController.js";
import { authenticateToken, validateRequest } from "../../../shared/middleware/index.js";
import { createTagSchema, validateTagsSchema } from "./validation.js";

const router = Router();

router.use(authenticateToken);

router.post("/", validateRequest(createTagSchema), tagController.createTag);
router.get("/", tagController.getTags);
router.post("/:tagId", validateRequest(validateTagsSchema), tagController.validateTags);

export default router;
