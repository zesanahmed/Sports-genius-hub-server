import { Router } from "express";
import { approveClass, denyClass } from "../controllers/admin.controller";
import { requireRole } from "../middleware/authMiddleware";

const router = Router();

router.patch("/classes/approve/:id", requireRole("admin"), approveClass);
router.patch("/classes/deny/:id", requireRole("admin"), denyClass);

export default router;
