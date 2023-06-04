import express, { Router } from "express";
import {
  createPost,
  createPosts,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/postController";

const router = express.Router();
// get all cars
router.get("/posts", getPosts);
// get specific car
router.get("/post/:id", getPost);
// create cars
router.post("/post", createPost);
router.post("/posts", createPosts);
// delete car
router.delete("/post/:id", deletePost);
// update car
router.put("/post/:id", updatePost);
// export all routers of car
export default router;
