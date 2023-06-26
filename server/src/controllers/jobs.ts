import { Request, Response } from "express";
import { Job } from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { ExpressRequestInterface } from "../types/expressRequest.interface.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getJob = async (req: ExpressRequestInterface, res: Response) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id, createdBy: req.userId });
  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req: ExpressRequestInterface, res: Response) => {
  req.body.createdBy = req.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};
