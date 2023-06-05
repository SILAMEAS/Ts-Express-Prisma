import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const friendController = {
  addOrRemoveFriend: async (req: Request, res: Response) => {
    try {
      const { user_id, friends_id } = req.body;
      const user = await prisma.user.findFirst({ where: { id: user_id } });
      const friend = await prisma.user.findFirst({ where: { id: friends_id } });
      if (user?.friends.includes(friends_id)) {
        user.friends = user.friends.filter((id) => id !== friends_id);
        friend!.friends = friend!.friends.filter((id) => id !== user_id);
        console.log("user", user.friends);
        console.log("friend", friend!.friends);
        await prisma.user.update({
          where: { id: user_id },
          data: { friends: user.friends },
        });
        await prisma.user.update({
          where: { id: friends_id },
          data: { friends: friend!.friends },
        });
      } else {
        user?.friends.push(friends_id);
        friend?.friends.push(user_id);
        await prisma.user.update({
          where: { id: user_id },
          data: { friends: user?.friends },
        });
        await prisma.user.update({
          where: { id: friends_id },
          data: { friends: friend!.friends },
        });
      }
      res.status(200).json({ user: user, friend: friend });
    } catch (e) {
      res.status(400).json(e);
    }
  },
};

export { friendController };
