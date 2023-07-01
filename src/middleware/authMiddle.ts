import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

export function verifyToken(req: Request, res: Response, next: any) {
  const { authorization } = req.headers;

  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthrization" });
  }
  jwt.verify(token, "SECRET123", (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ message: "Unauthrization" });
    }
    next();
  });
}
