import express, { Request, Router } from "express";
import { userController } from "../controller/userController";
import { verifyToken } from "../middleware/authMiddle";
const path = require("path");
const multer = require("multer");
const router = express.Router();
// -------------------Upload file to storage----------------------------
// create path for store profile_picture_path
router.use(express.static(path.join(__dirname, "../uploads")));
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
    console.log(fileName);
    cb(null, fileName);
  },
});
//--================================================
const upload = multer({ storage: storage });
// get all users
router.get("/all", userController.getUsers);
// get specific user
router.get("/:id", verifyToken, userController.getUser);
// create user
router.post("/register", upload.single("image"), userController.createUser);
// delete user
router.delete("/all", verifyToken, userController.deleteUsers);
router.delete("/:id", verifyToken, userController.deleteUser);
// update user
router.put("/:id", verifyToken, userController.updateUser);
// login
router.put("/:id", verifyToken, userController.updateUser);
router.post("/login", userController.login);
router.post("/logout/:email", userController.logout);
router.post("/mail", userController.mail);
// export all routers of users
export default router;
