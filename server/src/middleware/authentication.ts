import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import { ExpressRequestInterface } from "../types/expressRequest.interface.js";

export const authenticateUser = async (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; email: string };

    const testUser = payload.userId === "649a8f0dc346845870d1742c";

    req.userId = payload.userId;
    req.ifTestUser = testUser;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
