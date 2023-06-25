import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// };
const messageController = {
  addMessage: async (req: Request, res: Response) => {
    const { chatId, senderId, text } = req.body;
    console.log(req.body);
    if (!chatId || !senderId || !text) {
      return res.status(404).json({
        message: "required fields",
      });
    }
    try {
      const createChat = await prisma.message.create({
        data: { chatId: chatId, sender: senderId, text: text },
      });
      res.status(201).json(createChat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getMessages: async (req: Request, res: Response) => {
    const { chatId } = req.params;
    try {
      const createChat = await prisma.message.findFirst({
        where: { chatId: chatId },
      });
      res.status(201).json(createChat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export { messageController };
