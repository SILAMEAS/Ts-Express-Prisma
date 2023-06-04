import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { car: true, Post: true },
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
};
const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      include: { car: true, Post: true },
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("email", email, "password", password);
    const user = await prisma.user.findFirst({
      // include: { car: true, Post: true },
      where: {
        email: email,
        password: password,
      },
    });
    // console.log(user);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};
const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
      select: {
        car: {
          where: {
            userId: parseInt(id),
          },
        },
      },
    });

    res.status(200).json({ message: "delelte user id :" + id, result: user });
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: email,
        password: password,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};
export { getUsers, createUser, getUser, deleteUser, updateUser, login };
