import express, { Router } from "express";
import { friendController } from "../controller/friendsController";
const multer = require("multer");

const router = express.Router();
// get all cars
router.get("/both/:id", friendController.getFriendOrNotFriend);
// // get specific car
// router.get("/friend/:id", postController.getPost);
// // create cars
//addfriend | unfriend
router.post("/add-unfriend", friendController.addOrRemoveFriend);
// like or unlike
router.post("/like-unlike", friendController.likeUnlike);
// shares or delete shares
router.post("/share-deleteshare", friendController.shareOrUnShare);
// shares or delete shares
router.post("/comment", friendController.commments);
// router.post("/friends", postController.createPosts);
// // delete car
// router.delete("/friend/:id", postController.deletePost);
// // update car
// router.put("/friend/:id", postController.updatePost);
// export all routers of car
export default router;
