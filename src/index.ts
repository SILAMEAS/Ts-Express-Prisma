import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoute from "./routes/userRoutes";
import carsRoute from "./routes/carRoutes";

import postsRoute from "./routes/postRoutes";
import friendsRoute from "./routes/friendRoutes";
import { verifyToken } from "./middleware/authMiddle";
import dotenv from "dotenv";
import path from "path";
import { SocketConfig } from "./SocketConfig";

// open cors between backend and forn end
const cors = require("cors");
// config dotenv for using .env
dotenv.config();
// make function from express
const app = express();
// create class from Prisma for using
const prisma = new PrismaClient();
// using for sent mail to client
const nodemailer = require("nodemailer");
// config http for using with socket.io
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
// allow fron end can access to back end
app.use(cors());
// open cors origin when we use socket.io
export const io = new Server(server, {
  cors: { origin: "http://localhost:3000", method: ["GET", "POST"] },
});
const socketRoute = require("./routes/Socket/socketRoute")(io);
// can get data as json form fron end
app.use(express.json());

// create folder for store image when we upload image
app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../PostsPic")));
// all processing
async function main() {
  // all routes that we have
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/socket", socketRoute);
  app.use("/api/v1", verifyToken, carsRoute);
  app.use("/api/v1/post", verifyToken, postsRoute);
  app.use("/api/v1/friend", verifyToken, friendsRoute);
  // io.on("connection", (socket: any) => {
  //   console.log("==> " + socket.id);
  //   socket.on("connected", (userId: any) => {
  //     users[userId] = socket.id;
  //     console.log("users", users);
  //   });

  // });
  // socket real time
  // socket connection
  let allUsers: string[] = ["admin"];
  io.on("connection", (socket: any) => {
    // socket all id of user
    console.log("socket.id", socket.id);
    // fuction in socket
    SocketConfig({ socket, allUsers });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    // if database connect success
    console.log("DB connnected and running socket");
    server.listen(process.env.PORT, () => {
      // show the port that we running back end
      console.log(
        "Server running on port: http://localhost:" + process.env.PORT
      );
    });
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
