import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectDB } from "../config/db";
import { UserDoc } from "../types/user";
import { verifyJWT } from "../middleware/auth";

const router = Router();

const signToken = (u: {
  _id: ObjectId;
  email: string;
  role: "admin" | "user";
}) => {
  return jwt.sign(
    { sub: u._id.toString(), email: u.email, role: u.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const db = await connectDB();
    const users = db.collection<UserDoc>("users");

    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });

    const exists = await users.findOne({ email });
    if (exists) return res.status(409).json({ error: "User already exists" });

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS || 10)
    );

    // IMPORTANT: role hardcoded to "user" (signup থেকে admin নেওয়া হবে না)
    const toInsert: UserDoc = {
      email,
      passwordHash,
      role: "user",
      createdAt: new Date(),
    };

    const result = await users.insertOne(toInsert);
    const user = { _id: result.insertedId, email, role: "user" as const };

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const db = await connectDB();
    const users = db.collection<UserDoc>("users");

    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    if (!email || !password)
      return res.status(400).json({ error: "Email & password required" });

    const user = await users.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({
      _id: user._id!,
      email: user.email,
      role: user.role,
    });
    return res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch {
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/auth/me  (token থেকে প্রোফাইল)
router.get("/me", verifyJWT, async (req, res) => {
  // @ts-expect-error added in verifyJWT
  const { sub, email, role } = req.user;
  res.json({ id: sub, email, role });
});

export default router;
