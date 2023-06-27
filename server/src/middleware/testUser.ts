import { Request, Response, NextFunction } from "express";
import { ExpressRequestInterface } from "../types/expressRequest.interface.js";
import { BadRequestError } from "../errors/index.js";

export const testUserLimitations = (req: ExpressRequestInterface, res: Response, next: NextFunction) => {
  if (req.ifTestUser) {
    throw new BadRequestError("Test user. Read only");
  }
  next();
};
