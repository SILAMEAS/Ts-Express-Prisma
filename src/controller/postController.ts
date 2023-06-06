import { PrismaClient } from "@prisma/client";
import express, { Request, Router, Response } from "express";

const prisma = new PrismaClient();
//--================================================
const postController = {
  getPosts: async (req: Request, res: Response) => {
    try {
      const posts = await prisma.post.findMany({ include: { comments: true } });
      res.status(200).json(posts);
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
    const { title, userId, profile_picture_path, username, image_path } =
      req.body;
    console.log(req.body);
    try {
      const post = await prisma.post.create({
        data: {
          userId: userId,
          title: title,
          username: username,
          image_path: image_path,
          profile_picture_path: profile_picture_path,
        },
      });
      res.status(201).json(post);
    } catch (error) {
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
      res.status(400).json(error);
    }
  },
  deletePost: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const post = await prisma.post.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json(post);
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
