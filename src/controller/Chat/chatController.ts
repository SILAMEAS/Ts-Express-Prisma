import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const chatController = {
  addChat: async (req: Request, res: Response) => {
    try {
      const { text, senderId, recieverId } = req.body;
      // console.log(req.body);
      const sender = await prisma.user.findFirst({ where: { id: senderId } });
      const reciever = await prisma.user.findFirst({
        where: { id: recieverId },
        include: {
          chat: true,
        },
      });
      if (!sender || !reciever) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const addChatMessageToSender = await prisma.chat.create({
        data: {
          userId: senderId,
          recieverId: recieverId,
          senderId: senderId,
          text: text,
        },
      });
      const addChatMessageToReciever = await prisma.chat.create({
        data: {
          userId: recieverId,
          recieverId: recieverId,
          senderId: senderId,
          text: text,
        },
      });

      res.status(201).json({
        SENDER: addChatMessageToSender,
        RECIEVER: addChatMessageToReciever,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteChat: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { senderId } = req.params;
      const sender = await prisma.user.findFirst({
        where: { id: senderId },
        select: { chat: true },
      });
      // const deleteCHAT = await prisma.chat.delete({
      //   where: {
      //     id: id,
      //   },
      // });
      res.status(200).json({
        message: sender,
      });
      // res.status(200).json({
      //   message: "message ( " + deleteCHAT.text + " ) deleted successfully",
      // });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteChats: async (req: Request, res: Response) => {
    try {
      const deleteCHAT = await prisma.chat.deleteMany({});
      res.status(200).json({
        message: "delete successfully",
      });
      // res.status(200).json({
      //   message: "message ( " + deleteCHAT.text + " ) deleted successfully",
      // });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  upldateChat: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { text, senderId, recieverId } = req.body();
      const updateMessage = await prisma.chat.update({
        where: { id: id },
        data: {
          recieverId: recieverId,
          senderId: senderId,
          text: text,
        },
      });
      res.status(200).json({
        message:
          "updated successfully with " + updateMessage.text + " successfully",
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  veiwChat: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const chat = await prisma.chat.findFirst({
        where: { id: id },
      });
      res.status(200).json({
        message: chat,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  veiwChats: async (req: Request, res: Response) => {
    try {
      const chat = await prisma.chat.findMany({});
      res.status(200).json({
        message: chat,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  veiwChatBySenderId: async (req: Request, res: Response) => {
    try {
      const { sendId } = req.params;
      const { recieverId } = req.body;
      console.log(sendId + "/" + recieverId);
      const sender = await prisma.user.findFirst({ where: { id: sendId } });
      const reciever = await prisma.user.findFirst({
        where: { id: recieverId },
      });
      console.log("D");
      // const chat = await prisma.chat.findMany({});
      res.status(200).json({
        message: sender?.email + "-- to--" + reciever?.email,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export { chatController };
