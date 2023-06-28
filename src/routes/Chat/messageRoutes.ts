import express, { Router } from "express";
import { messageController } from "../../controller/Chat/messageController";

const router = express.Router();
router.get("/getAllMessages", messageController.getAllMessages);
router.post("/", messageController.addMessage);
router.get("/:chatId", messageController.getMessages);
router.delete("/deletes", messageController.deleteMessages);
router.delete("/:id", messageController.deleteMessagesById);

export default router;
