import { chat_controller } from "../controllers/chat_controller";
import { Router } from "express";
const router = Router();

router.post("/", chat_controller);

export default router;
