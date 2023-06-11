import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import userRoute from "./routes/userRoutes";
import carsRoute from "./routes/carRoutes";
import postsRoute from "./routes/postRoutes";
import friendsRoute from "./routes/friendRoutes";
import { verifyToken } from "./middleware/authMiddle";
import dotenv from "dotenv";
import path from "path";
const cors = require("cors");
dotenv.config();
const app = express();
const prisma = new PrismaClient();
// can get data json form fron end
app.use(express.json());
// allow fron end can access to back end
app.use(cors());
app.use(express.static(path.join(__dirname, "../uploads")));
app.use(express.static(path.join(__dirname, "../PostsPic")));
// handle connection to database
async function main() {
  // all routes that we have
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1", verifyToken, carsRoute);
  app.use("/api/v1/post", verifyToken, postsRoute);
  app.use("/api/v1/friend", verifyToken, friendsRoute);
}
main()
  .then(async () => {
    await prisma.$disconnect();
    // if database connect success
    console.log("DB connnected");
    app.listen(process.env.PORT, () => {
      // show the port that we running back end
      console.log("Server running on port: " + process.env.PORT);
    });
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
