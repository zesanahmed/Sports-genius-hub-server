import { Router, Request, Response } from "express";
import { verifyToken, requireRole } from "../middleware/auth";

const router = Router();

router.get(
  "/dashboard",
  verifyToken,
  requireRole("admin"),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome to Admin Dashboard" });
  }
);

export default router;
