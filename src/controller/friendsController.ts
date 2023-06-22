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
  getFriendOrNotFriend: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findFirst({
        where: { id: id },
        include: { chat: true },
      });
      const myfriends: {
        id: string;
        username: string;
        profile_picture_path: string;
        online: boolean;
      }[] = [];
      const notMyfriends: {
        id: string;
        username: string;
        profile_picture_path: string;
        online: boolean;
      }[] = [];

      user &&
        (await Promise.all(
          user!.friends.map(async (item) => {
            const yourFriend = await prisma.user.findFirst({
              where: { id: item },
            });
            if (yourFriend) {
              const format: {
                id: string;
                username: string;
                profile_picture_path: string;
                online: boolean;
              } = {
                id: yourFriend!.id,
                username: yourFriend!.name,
                profile_picture_path: yourFriend!.profile_picture_path,
                online: yourFriend?.online,
              };
              myfriends.push(format);
            }
          })
        ));
      const allUsers = await prisma.user.findMany({});
      allUsers &&
        (await Promise.all(
          allUsers.map(async (item) => {
            if (!user?.friends.includes(item.id)) {
              const notFriends = await prisma.user.findFirst({
                where: { id: item.id },
              });
              if (notFriends && notFriends.id !== id) {
                const format: {
                  id: string;
                  username: string;
                  profile_picture_path: string;
                  online: boolean;
                } = {
                  id: notFriends.id,
                  profile_picture_path: notFriends.profile_picture_path,
                  username: notFriends.name,
                  online: notFriends.online,
                };
                notMyfriends.push(format);
              }
            }
          })
        ));
      res.json({ friends: myfriends, notFriends: notMyfriends });
    } catch (error) {
      res.json(error);
    }
  },
  likeUnlike: async (req: Request, res: Response) => {
    try {
      const { post_id, user_id } = req.body;
      console.log("idPost", post_id, "???", "userID", user_id);
      if (post_id && user_id) {
        const post = await prisma.post.findFirst({ where: { id: post_id } });
        if (post?.like.includes(user_id)) {
          post.like = post.like.filter((id) => id !== user_id);
          const d = await prisma.post.update({
            where: { id: post_id },
            data: { like: post.like },
          });
        } else {
          post?.like.push(user_id);
          const c = await prisma.post.update({
            where: { id: post_id },
            data: { like: post!.like },
          });
        }
        return res.status(201).json(post);
      }

      return res.status(400).json("required field");
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  shareOrUnShare: async (req: Request, res: Response) => {
    try {
      const { post_id, user_id } = req.body;
      const post = await prisma.post.findFirst({ where: { id: post_id } });
      if (post?.shares.includes(user_id)) {
        post.shares = post.shares.filter((id) => id !== user_id);
        await prisma.post.update({
          where: { id: post_id },
          data: { shares: post.shares },
        });
      } else {
        post?.shares.push(user_id);
        await prisma.post.update({
          where: { id: post_id },
          data: { shares: post!.shares },
        });
      }
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  commments: async (req: Request, res: Response) => {
    try {
      const { post_id, message, user_id } = req.body;

      console.log(req.params, req.body);

      const c = await prisma.comments.create({
        data: { message: message, postId: post_id, userId: user_id },
      });

      const post = await prisma.post.findFirst({
        where: { id: post_id },
        include: { comments: true },
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

export { friendController };
