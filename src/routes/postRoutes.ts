import express, { Router } from "express";
import { postController } from "../controller/postController";

const router = express.Router();
// get all cars
router.get("/posts", postController.getPosts);
// get specific car
router.get("/post/:id", postController.getPost);
// create cars
router.post("/post", postController.createPost);
router.post("/posts", postController.createPosts);
// delete car
router.delete("/post/:id", postController.deletePost);
// update car
router.put("/post/:id", postController.updatePost);
// export all routers of car
export default router;
