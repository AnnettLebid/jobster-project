import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { customErrorInterface } from "../types/customError.interface.js";

export const errorHandlerMiddleware = (err: customErrorInterface, req: Request, res: Response, next: NextFunction) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
