import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  updateUser,
} from "../controller/userController";
const router = express.Router();
// get all users
router.get("/users", getUsers);
// get specific user
router.get("/user/:id", getUser);
// create user
router.post("/signup", createUser);
// delete user
router.delete("/user/:id", deleteUser);
// update user
router.put("/user/:id", updateUser);
// login
router.post("/login", login);
// export all routers of users
export default router;
