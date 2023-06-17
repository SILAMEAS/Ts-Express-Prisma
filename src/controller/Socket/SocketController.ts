import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
import { io } from "../..";

const socketController = {
  getForcase: async (req: Request, res: Response) => {
    try {
      const count = req.query.count;
      if (!count) {
        return res.json({ message: "count not exits" }).status(400);
      }

      io.emit("mod_forecase", count);
      res.status(200).json("data delivered");
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

export { socketController };
