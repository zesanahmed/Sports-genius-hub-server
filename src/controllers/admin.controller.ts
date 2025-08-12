import { Request, Response } from "express";
import { connectDB } from "../config/db";
import { ObjectId } from "mongodb";

export const approveClass = async (req: Request, res: Response) => {
  const db = await connectDB();
  const id = req.params.id;
  const result = await db
    .collection("classes")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status: "approved" } });
  res.json(result);
};

export const denyClass = async (req: Request, res: Response) => {
  const db = await connectDB();
  const id = req.params.id;
  const result = await db
    .collection("classes")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status: "denied" } });
  res.json(result);
};
