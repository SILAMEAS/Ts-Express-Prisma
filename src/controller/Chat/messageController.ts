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
        data: { chatId: chatId, senderId: senderId, text: text },
      });
      res.status(201).json(createChat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getMessages: async (req: Request, res: Response) => {
    const { chatId } = req.params;
    try {
      const createChat = await prisma.message.findMany({
        where: { chatId: chatId },
      });
      res.status(201).json(createChat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteMessages: async (req: Request, res: Response) => {
    try {
      const deleteMessage = await prisma.message.deleteMany({});
      res.status(200).json(deleteMessage);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteMessagesById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deleteMessage = await prisma.message.delete({ where: { id: id } });
      res.status(200).json(deleteMessage);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getAllMessages: async (req: Request, res: Response) => {
    try {
      const message = await prisma.message.findMany({});
      res.status(200).json(message);
      console.log("object");
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export { messageController };
