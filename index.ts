import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const port = 3000;
const prisma = new PrismaClient();
app.use(express.json());

app.post("/signup", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
  res.json(user);
});
app.post("/addManyCars", async (req: Request, res: Response) => {
  const { carList } = req.body;
  const cars = await prisma.car.createMany({
    data: carList,
  });
  res.json(cars);
});
app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { car: true } });
  res.json(users);
});
app.get("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    include: { car: true },
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
});
app.put("/user/:id", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { id } = req.params;
  const userUpdate = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      email: email,
      password: password,
    },
  });
  res.json(userUpdate);
});
app.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(deleteUser);
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
