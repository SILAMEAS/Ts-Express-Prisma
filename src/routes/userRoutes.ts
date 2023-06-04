import express, { Request, Router } from "express";
const multer = require("multer");
import {
  createUser,
  deleteUser,
  deleteUsers,
  getUser,
  getUsers,
  login,
  updateUser,
} from "../controller/userController";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "uploads");
  },
  filename: function (req: Request, file: any, cb: any) {
    const fileName =
      file.fieldname +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      ".jpg";
    req.body.profile_picture_path = fileName;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
// get all users
router.get("/users", getUsers);
// get specific user
router.get("/user/:id", getUser);
// create user
router.post("/signup", upload.single("image"), createUser);
// delete user
router.delete("/user/:id", deleteUser);

router.delete("/users", deleteUsers);
// update user
router.put("/user/:id", updateUser);
// login
router.post("/login", login);
// export all routers of users
export default router;
