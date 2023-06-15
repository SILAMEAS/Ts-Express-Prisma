import { PrismaClient } from "@prisma/client";
import express, { Request, Router, Response } from "express";

const prisma = new PrismaClient();

//--================================================
const postController = {
  getPosts: async (req: Request, res: Response) => {
    try {
      const posts = await prisma.post.findMany({
        include: { comments: true },
        orderBy: { createdAt: "asc" },
      });
      res.status(200).json(posts);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getYourPostsAndFriendPost: async (req: Request, res: Response) => {
    try {
      const { useId } = req.params;
      const DataUser = await prisma.user.findFirst({ where: { id: useId } });
      const POST: any[] = [];
      const yourPost = await prisma.user.findFirst({
        where: { id: useId },
        select: { Post: true },
      });
      yourPost &&
        (await Promise.all(
          yourPost?.Post.map((item) => {
            if (item) {
              POST.push(item);
            }
          })
        )) &&
        console.log(POST.length, " --", "yourPost", POST);

      DataUser &&
        (await Promise.all(
          DataUser?.friends.map(async (friendId) => {
            const friendPost = await prisma.user.findFirst({
              where: { id: friendId },
              select: { Post: true },
            });

            if (friendPost) {
              friendPost.Post.map((item) => {
                POST.push(item);
              });
            }
          })
        ));
      const sortedAsc = POST.sort(
        (objA, objB) => Number(objA.date) - Number(objB.date)
      );
      res.status(200).json(sortedAsc);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  getPost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.findFirst({
        // include: { car: true, profile: true },
        where: {
          id: id,
        },
        include: { comments: true },
      });
      res.status(200).json(post);
    } catch (e) {
      res.status(400).json(e);
    }
  },
  createPost: async (req: Request, res: Response) => {
    const { title, userId, profile_picture_path, image_path } = req.body;
    // console.log(req.body);
    try {
      const user = await prisma.user.findFirst({ where: { id: userId } });
      const post = await prisma.post.create({
        data: {
          userId: userId,
          title: title,
          username: user!.name ?? "UNKNOW",
          image_path: image_path,
          profile_picture_path: profile_picture_path,
        },
      });

      res.status(201).json(post);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  createPosts: async (req: Request, res: Response) => {
    try {
      const { postLists } = req.body;
      const posts = await prisma.post.createMany({
        data: postLists,
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  deletePost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      console.log(id, userId);
      const dataPost = await prisma.post.findFirst({ where: { id: id } });
      console.log("postUserID", dataPost?.userId);
      console.log("userId", userId);
      console.log(dataPost?.userId === userId);
      if (id && userId) {
        if (dataPost?.userId === userId) {
          const post = await prisma.post.delete({
            where: {
              id: id,
            },
          });
          return res.status(200).json(post);
        }
        return res.status(400).json({ message: "Not your post" });
      } else {
        return res.status(400).json("data required");
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
  deletePostS: async (req: Request, res: Response) => {
    try {
      let message = "";
      const { userId } = req.params;
      const user = await prisma.user.findFirst({
        where: { id: userId },
        include: { Post: true },
      });
      console.log(user);
      if (user!.Post.length > 0) {
        user!.Post.map(async (item) => {
          const DeletePost = await prisma.post.delete({
            where: {
              id: item.id,
            },
          });
        });
      }
      return res.status(200).json({
        message:
          user!.Post.length > 0 ? "Delete success" : "Account don't have post",
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  updatePost: async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
      const { id } = req.params;
      const post = await prisma.post.update({
        where: {
          id: id,
        },
        data: {
          title: title,
        },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

export { postController };
