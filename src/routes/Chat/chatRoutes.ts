import express, { Router } from "express";
import { chat } from "../../controller/Chat/chatController";

const router = express.Router();
// get all cars
// router.get("/all", chatController.veiwChats);
// router.get("/two_users", chatController.veiwChatBySenderId);

// router.post("/addChat", chatController.addChat);
// router.delete("/deleteChat/:id", chatController.deleteChat);
// router.delete("/deleteChats", chatController.deleteChats);
//===========================================================
router.post("/", chat.createChat);
router.get("/:userId", chat.userChats);
router.get("/", chat.Allchat);
router.get("/find/:firstId/:secondId", chat.findChat);
router.delete("/delete/all", chat.delete);
router.delete("/:id", chat.deleteById);

// // delete car
// router.delete("/friend/:id", postController.deletePost);
// // update car
// router.put("/friend/:id", postController.updatePost);
// export all routers of car
export default router;
