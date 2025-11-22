import dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || 3000;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
export const WEB_SEARCH_API_KEY = process.env.WEB_SEARCH_API_KEY || "";
export const WEB_SEARCH_API_URL = process.env.WEB_SEARCH_API_URL || "";
export const WEB_SEARCH_CX = process.env.WEB_SEARCH_CX || "";
