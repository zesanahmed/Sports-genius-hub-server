"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.patch("/classes/approve/:id", (0, authMiddleware_1.requireRole)("admin"), admin_controller_1.approveClass);
router.patch("/classes/deny/:id", (0, authMiddleware_1.requireRole)("admin"), admin_controller_1.denyClass);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map