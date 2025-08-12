import { Request, Response } from "express";
import { connectDB } from "../config/db";

export const getUsers = async (req: Request, res: Response) => {
  const db = await connectDB();
  const users = await db.collection("users").find().toArray();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const db = await connectDB();
  const user = req.body;
  const existing = await db.collection("users").findOne({ email: user.email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }
  const result = await db.collection("users").insertOne(user);
  res.json(result);
};
