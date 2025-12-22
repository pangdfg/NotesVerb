import { Router } from "express";
import * as noteController from "./noteController.js";
import { validateRequest, authenticateToken } from "../../../shared/middleware/index.js";
import { createNoteSchema, getNotesByUserSchema } from "./validation.js";

const router = Router();

router.use(authenticateToken);

router.post("/", validateRequest(createNoteSchema), noteController.createNote);
router.get("/", validateRequest(getNotesByUserSchema), noteController.getNotes);
router.get("/:noteId", noteController.getNoteById);

export default router;