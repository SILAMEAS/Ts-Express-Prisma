import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoute from "./routes/userRoutes";
import carsRoute from "./routes/carRoutes";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
// all routes
app.use("/api/v1", userRoute);
app.use("/api/v1", carsRoute);
app.listen(process.env.PORT, () => {
  console.log("Server running on port: " + process.env.PORT);
});
