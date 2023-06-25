import express, { Router } from "express";
import { messageController } from "../../controller/Chat/messageController";

const router = express.Router();

router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessages);

export default router;