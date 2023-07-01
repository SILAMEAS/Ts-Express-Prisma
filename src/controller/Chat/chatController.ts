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
const chat = {
  createChat: async (req: Request, res: Response) => {
    const { senderId, recieverId } = req.body;
    try {
      if (!recieverId || !senderId) {
        return res.status(404).json({
          message: "required fields",
        });
      }
      const reciever = await prisma.user.findFirst({
        where: { id: recieverId },
        select: { profile_picture_path: true, name: true },
      });
      const sender = await prisma.user.findFirst({
        where: { id: senderId },
        select: { profile_picture_path: true, name: true },
      });
      if (!sender || !reciever) {
        return res.status(404).json({
          message: "sender or reciever is null",
        });
      }
      const find = await prisma.chat.findFirst({
        where: {
          OR: [
            {
              members: { hasSome: [senderId, recieverId] },
            },
            { members: { hasSome: [recieverId, senderId] } },
          ],
        },
      });
      if (find) {
        return res.status(400).json({
          message: "Chat already exists",
        });
      }
      const createChat = await prisma.chat.create({
        data: {
          members: [senderId, recieverId],
          chatName: [reciever.name, sender.name],
          chatPicture: [
            reciever.profile_picture_path,
            sender.profile_picture_path,
          ],
        },
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
        },
      });
      // const members: any[] = [];
      // chat.map((member) => member.members.map((item) => members.push(item)));
      // console.log(members);
      // const users = await prisma.user.findMany({
      //   where: {
      //     id: { in: members },
      //   },
      //   select: {
      //     online: true,
      //     id: true,
      //     name: true,
      //     profile_picture_path: true,
      //   },
      // });
      res.status(200).json({ chat });
      // const members: string[] = [];
      // const Allusers: any[] = [];

      // chat.map((chat) => chat.members.map((member) => members.push(member)));
      // members.length > 0 &&
      //   (await Promise.all(
      //     members
      //       .filter((item) => item !== req.params.userId)
      //       .map(async (member) => {
      //         const user = await prisma.user.findFirst({
      //           where: { id: member },
      //           select: {
      //             name: true,
      //             online: true,
      //             profile_picture_path: true,
      //             id: true,
      //           },
      //         });
      //         // console.log(user);
      //         if (user) {
      //           Allusers.push(user);
      //         }
      //         console.log(Allusers);
      //       })
      //   ));

      // if (members.length > 0) {
      //   // console.log(members);
      // members.map(async (member) => {
      //   const user = await prisma.user.findFirst({ where: { id: member } });
      //   // console.log(user);
      //   if (user) {
      //     Allusers.push(user);
      //   }
      //   console.log(Allusers);
      // });
      // }
    } catch (e) {
      res.status(400).json(e);
    }
  },
  Allchat: async (req: Request, res: Response) => {
    console.log("get all chat");
    try {
      const chat = await prisma.chat.findMany({});
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
      const message = await prisma.message.deleteMany({});
      res.status(200).json({
        chat: Del,
        message: message,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
  deleteById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const Del = await prisma.chat.delete({ where: { id: id } });

      res.status(200).json({
        Del,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export { chat };
