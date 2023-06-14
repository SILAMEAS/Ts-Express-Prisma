import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import getToken from "../utils/generateToken/generateToken";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const userController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          Post: {
            select: {
              comments: true,
              image_path: true,
              like: true,
              id: true,
              shares: true,
            },
          },
          email: true,
          friends: true,
          profile_picture_path: true,
        },
      });
      res.status(200).json(users);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirst({
        include: { Post: true },
        where: {
          id: id,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          email: true,
          id: true,
          profile_picture_path: true,
          name: true,
          role: true,
          password: true,
        },
      });
      // compare password before and after encrypt
      const compare = await bcrypt.compare(password, user?.password);
      if (!compare) res.status(401).json({ message: "password not correct" });
      if (compare) {
        const token = getToken(user);
        res.status(200).json({ user, token, message: "login success" });
      }
    } catch (e) {
      res.status(400).json(e);
    }
  },
  createUser: async (req: Request, res: Response) => {
    const { email, password, name, profile_picture_path } = req.body;

    try {
      if (email && password && name && profile_picture_path) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await prisma.user.create({
          data: {
            email: email,
            password: hashPassword,
            name: name,
            profile_picture_path: profile_picture_path,
          },
        });
        res.status(200).json(user);
      } else {
        console.log("all data is required");
        res.status(400).json({ message: "data required" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await prisma.user.delete({
        where: {
          id: id,
        },
      });

      res
        .status(200)
        .json({ message: "delelte user have email : (" + user.email + ")" });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updateUser: async (req: Request, res: Response) => {
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
  },
  deleteUsers: async (req: Request, res: Response) => {
    try {
      const user = await prisma.user.deleteMany({});
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

export { userController };
