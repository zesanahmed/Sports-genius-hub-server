"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const db_1 = require("../config/db");
const getUsers = async (req, res) => {
    const db = await (0, db_1.connectDB)();
    const users = await db.collection("users").find().toArray();
    res.json(users);
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    const db = await (0, db_1.connectDB)();
    const user = req.body;
    const existing = await db.collection("users").findOne({ email: user.email });
    if (existing) {
        return res.status(400).json({ message: "User already exists" });
    }
    const result = await db.collection("users").insertOne(user);
    res.json(result);
};
exports.createUser = createUser;
//# sourceMappingURL=user.controller.js.map