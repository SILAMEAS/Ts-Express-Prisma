import { Request, Response } from "express";
import { socketController } from "../../controller/Socket/SocketController";

const express = require("express");

function SockerRouter(io: any) {
  const router = express.Router();
  router.get("/forecase", socketController.getForcase);
  return router;
}
module.exports = SockerRouter;
