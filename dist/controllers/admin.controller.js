"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.denyClass = exports.approveClass = void 0;
const db_1 = require("../config/db");
const mongodb_1 = require("mongodb");
const approveClass = async (req, res) => {
    const db = await (0, db_1.connectDB)();
    const id = req.params.id;
    const result = await db
        .collection("classes")
        .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: "approved" } });
    res.json(result);
};
exports.approveClass = approveClass;
const denyClass = async (req, res) => {
    const db = await (0, db_1.connectDB)();
    const id = req.params.id;
    const result = await db
        .collection("classes")
        .updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { status: "denied" } });
    res.json(result);
};
exports.denyClass = denyClass;
//# sourceMappingURL=admin.controller.js.map