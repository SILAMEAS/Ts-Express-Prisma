import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUser,
  updateUser,
} from "../controller/userController";
const router = express.Router();
// get all users
router.get("/users", getUser);
// get specific user
router.get("/user/:id", getOneUser);
// create user
router.post("/signup", createUser);
// delete user
router.delete("/user/:id", deleteUser);
// update user
router.put("/user/:id", updateUser);
// export all routers of users
export default router;
