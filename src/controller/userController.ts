import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const getUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { car: true },
    });
    res.status(200).json(users);
  } catch (e) {
    res.status(401).json(e);
  }
};
const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      include: { car: true },
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(401).json(e);
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
    res.status(401).json(error);
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

    res.status(200).json({ message: "delelte" + id });
  } catch (error) {
    res.status(401).json(error);
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
    res.status(401).json(error);
  }
};
export { getUser, createUser, getOneUser, deleteUser, updateUser };
