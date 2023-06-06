import express, { Request, Router, Response } from "express";
import { postController } from "../controller/postController";
const multer = require("multer");
const path = require("path");
const router = express.Router();
// -------------------Upload file to storage----------------------------
// create path for store profile_picture_path
router.use(express.static(path.join(__dirname, "../PostsPic")));
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "PostsPic");
  },
  filename: function (req: Request, file: any, cb: any) {
    const fileName =
      file.fieldname +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".jpg";
    req.body.image_path = fileName;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });
//===============================================
// get all cars
// router.get("/posts", postController.getPosts);
// // get specific car
// router.get("/post/:id", postController.getPost);
// // create cars
router.post("/add-post", upload.single("picPost"), postController.createPost);
// router.post("/posts", postController.createPosts);
// // delete car
// router.delete("/post/:id", postController.deletePost);
// // update car
// router.put("/post/:id", postController.updatePost);
// export all routers of car
export default router;
