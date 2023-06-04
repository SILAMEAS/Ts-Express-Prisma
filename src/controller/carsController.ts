import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();
const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await prisma.car.findMany();
    res.status(200).json(cars);
  } catch (e) {
    res.status(401).json(e);
  }
};
const getOneCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await prisma.car.findFirst({
      // include: { car: true, profile: true },
      where: {
        id: id,
      },
    });
    res.status(200).json(car);
  } catch (e) {
    res.status(401).json(e);
  }
};
const createCar = async (req: Request, res: Response) => {
  const { model, year, userId } = req.body;
  try {
    const car = await prisma.car.create({
      data: {
        model: model,
        year: year,
        userId: userId,
      },
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(401).json(error);
  }
};
const createCars = async (req: Request, res: Response) => {
  try {
    const { carList } = req.body;
    const cars = await prisma.car.createMany({
      data: carList,
    });
    res.status(200).json(cars);
  } catch (error) {
    res.status(401).json(error);
  }
};
const deleteCars = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const car = await prisma.car.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(401).json(error);
  }
};
const updateCar = async (req: Request, res: Response) => {
  const { model, year, userId } = req.body;
  try {
    const { id } = req.params;
    const user = await prisma.car.update({
      where: {
        id: id,
      },
      data: {
        model: model,
        year: year,
        userId: userId,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};
export { createCar, deleteCars, getCars, getOneCar, updateCar, createCars };
