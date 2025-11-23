"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_controller_1 = require("../controllers/chat_controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", chat_controller_1.chat_controller);
exports.default = router;
