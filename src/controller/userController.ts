import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import getToken from "../utils/generateToken/generateToken";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { car: true, Post: true },
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      include: { car: true, Post: true },
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log("email", email, "password", password);
    const user = await prisma.user.findFirst({
      // include: { car: true, Post: true },
      where: {
        email: email,
      },
    });
    // compare password before and after encrypt
    const compare = await bcrypt.compare(password, user?.password);
    // console.log("user", user);
    // console.log("compare", compare);
    if (!compare) res.status(401).json({ message: "password not correct" });
    if (compare) {
      const token = getToken(user);

      res.status(200).json({ user, token, message: "login success" });
    }

    // console.log(user);
    // res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};
const createUser = async (req: Request, res: Response) => {
  const { email, password, name, profile_picture_path } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name: name,
        profile_picture_path: profile_picture_path,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: id,
      },
      select: {
        car: {
          where: {
            userId: id,
          },
        },
      },
    });

    res.status(200).json({ message: "delelte user id :" + id, result: user });
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteUsers = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.deleteMany({});
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: email,
        password: password,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
export {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  login,
  deleteUsers,
};
