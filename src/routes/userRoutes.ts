import { Router, Request, Response } from "express";
import { verifyToken, requireRole } from "../middleware/auth";

const router = Router();

router.get(
  "/dashboard",
  verifyToken,
  requireRole("user"),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome to User Dashboard" });
  }
);

export default router;
