import { Request, Response, NextFunction } from "express";

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers["x-role"]; // Example: 'admin' or 'user'
    if (userRole !== role) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};
