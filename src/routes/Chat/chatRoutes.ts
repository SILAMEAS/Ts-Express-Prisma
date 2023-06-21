import express, { Router } from "express";
import { chatController } from "../../controller/Chat/chatController";

const router = express.Router();
// get all cars
router.get("/all", chatController.veiwChats);
router.get("/two_users", chatController.veiwChatBySenderId);

router.post("/addChat", chatController.addChat);
router.delete("/deleteChat/:id", chatController.deleteChat);
router.delete("/deleteChats", chatController.deleteChats);

// // delete car
// router.delete("/friend/:id", postController.deletePost);
// // update car
// router.put("/friend/:id", postController.updatePost);
// export all routers of car
export default router;
