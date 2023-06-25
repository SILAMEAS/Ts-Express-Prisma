import express, { Router } from "express";
import { chatCC } from "../../controller/Chat/chatController";

const router = express.Router();
// get all cars
// router.get("/all", chatController.veiwChats);
// router.get("/two_users", chatController.veiwChatBySenderId);

// router.post("/addChat", chatController.addChat);
// router.delete("/deleteChat/:id", chatController.deleteChat);
// router.delete("/deleteChats", chatController.deleteChats);
//===========================================================
router.post("/", chatCC.createChat);
router.get("/:userId", chatCC.userChats);
router.get("/all", chatCC.Allchat);
router.get("/find/:firstId/:secondId", chatCC.findChat);
router.delete("/delete", chatCC.delete);

// // delete car
// router.delete("/friend/:id", postController.deletePost);
// // update car
// router.put("/friend/:id", postController.updatePost);
// export all routers of car
export default router;
