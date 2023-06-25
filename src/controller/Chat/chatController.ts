import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
// const chatController = {
//   addChat: async (req: Request, res: Response) => {
//     try {
//       const { text, senderId, recieverId } = req.body;

//       if (!senderId || !recieverId || !text) {
//         return res.status(404).json({
//           message: "required fields",
//         });
//       }
//       const sender = await prisma.user.findFirst({ where: { id: senderId } });
//       const reciever = await prisma.user.findFirst({
//         where: { id: recieverId },
//         include: {
//           chat: true,
//         },
//       });
//       if (!sender || !reciever) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }
//       const addChatMessage = await prisma.chat.createMany({
//         data: [
//           {
//             userId: recieverId,
//             recieverId: recieverId,
//             senderId: senderId,
//             text: text,
//           },
//           {
//             userId: senderId,
//             recieverId: recieverId,
//             senderId: senderId,
//             text: text,
//           },
//         ],
//       });

//       res.status(201).json({
//         data: addChatMessage,
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
//   deleteChat: async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const { userId } = req.params;
//       const deleteMessage = await prisma.user.findFirst({
//         where: { id: userId },
//         select: { chat: true },
//       });
//       res.status(200).json({
//         message: deleteMessage,
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
//   deleteChats: async (req: Request, res: Response) => {
//     try {
//       const deleteCHAT = await prisma.chat.deleteMany({});
//       res.status(200).json({
//         message: deleteCHAT,
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
//   upldateChat: async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const { text, senderId, recieverId } = req.body();
//       const updateMessage = await prisma.chat.update({
//         where: { id: id },
//         data: {
//           recieverId: recieverId,
//           senderId: senderId,
//           text: text,
//         },
//       });
//       res.status(200).json({
//         message:
//           "updated successfully with " + updateMessage.text + " successfully",
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
//   veiwChat: async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;

//       const chat = await prisma.chat.findFirst({
//         where: { id: id },
//       });
//       res.status(200).json({
//         message: chat,
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
//   veiwChats: async (req: Request, res: Response) => {
//     try {
//       const chat = await prisma.chat.findMany({});
//       res.status(200).json({
//         message: chat,
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
//   veiwChatBySenderId: async (req: Request, res: Response) => {
//     try {
//       const { userId } = req.params;

//       const message = await prisma.user.findFirst({
//         where: { id: userId },
//         select: {
//           chat: true,
//         },
//       });

//       res.status(200).json({
//         message: message,
//       });
//     } catch (e) {
//       res.status(400).json(e);
//     }
//   },
// };
const chatCC = {
  createChat: async (req: Request, res: Response) => {
    const { senderId, recieverId } = req.body;
    console.log(req.body);
    if (!recieverId || !senderId) {
      return res.status(404).json({
        message: "required fields",
      });
    }
    try {
      const createChat = await prisma.chat.create({
        data: { members: [senderId, recieverId] },
      });
      res.status(201).json(createChat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  userChats: async (req: Request, res: Response) => {
    try {
      const chat = await prisma.chat.findMany({
        where: {
          members: { hasSome: [req.params.userId] },
          // createdAt: "2023-06-22T15:05:49.334Z",
        },
      });

      res.status(200).json(chat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  Allchat: async (req: Request, res: Response) => {
    try {
      const chat = await prisma.chat.findMany({
        where: {
          // members: { in: [req.params.userId] } as any,
          // createdAt: "2023-06-22T15:05:49.334Z",
        },
      });

      res.status(200).json(chat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  findChat: async (req: Request, res: Response) => {
    try {
      const chat = await prisma.chat.findMany({
        where: {
          AND: [
            {
              members: { has: req.params.firstId },
            },
            { members: { has: req.params.secondId } },
          ],
        },
      });

      res.status(200).json(chat);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const Del = await prisma.chat.deleteMany({});
      res.status(200).json({
        message: Del,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export { chatCC };
