import express, { Router } from "express";
import { friendController } from "../controller/friendsController";

const router = express.Router();
// // get all cars
// router.get("/friends", postController.getPosts);
// // get specific car
// router.get("/friend/:id", postController.getPost);
// // create cars
router.post("/add-unfriend", friendController.addOrRemoveFriend);
// router.post("/friends", postController.createPosts);
// // delete car
// router.delete("/friend/:id", postController.deletePost);
// // update car
// router.put("/friend/:id", postController.updatePost);
// export all routers of car
export default router;
