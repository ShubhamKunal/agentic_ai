"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEB_SEARCH_CX = exports.WEB_SEARCH_API_URL = exports.WEB_SEARCH_API_KEY = exports.GEMINI_API_KEY = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
exports.WEB_SEARCH_API_KEY = process.env.WEB_SEARCH_API_KEY || "";
exports.WEB_SEARCH_API_URL = process.env.WEB_SEARCH_API_URL || "";
exports.WEB_SEARCH_CX = process.env.WEB_SEARCH_CX || "";
