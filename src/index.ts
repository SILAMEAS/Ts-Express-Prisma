import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoute from "./routes/userRoutes";
import carsRoute from "./routes/carRoutes";
import chatRoute from "./routes/Chat/chatRoutes";
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
  cors: { origin: "*", method: ["GET", "POST"] },
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
  //================================================================
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/socket", socketRoute);
  app.use("/api/v1", verifyToken, carsRoute);
  app.use("/api/v1/post", verifyToken, postsRoute);
  app.use("/api/v1/friend", verifyToken, friendsRoute);
  app.use("/api/v1/chat", verifyToken, chatRoute);
  //================================================================
  var users: any = [];
  io.on("connection", (socket: any) => {
    // socket all id of user
    // console.log("user connection", socket.id);
    socket.on("user_connected", (username: any) => {
      // save in array
      // console.log("process");
      // console.log(username);
      // console.log(users);
      users[username] = socket.id;
      // console.log(users);
      //notify al connected user
      io.emit("user_connected", users);
    });
    // fuction in socket
    SocketConfig({ socket });
    socket.on("send_message", (data: any) => {
      // send event to reciever
      var socketId = users[data.reciever];
      io.to(socketId).emit("new_message", data);
    });
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
