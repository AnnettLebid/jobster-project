import { Request, Response } from "express";
import { Job } from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { ExpressRequestInterface } from "../types/expressRequest.interface.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllJobs = async (req: ExpressRequestInterface, res: Response) => {
  const { search, status, jobType, sort } = req.query;
  const queryObject: any = {
    createdBy: req.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  let result = Job.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  const jobs = await result;

  res.status(StatusCodes.OK).send({ jobs, totalJobs, numOfPages });
};

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

export const updateJob = async (req: ExpressRequestInterface, res: Response) => {
  const { id } = req.params;
  const { company, position } = req.body;

  if (company === "" || position === "") {
    throw new BadRequestError("Company and position fields cannot be empty");
  }

  const job = await Job.findByIdAndUpdate({ _id: id, createdBy: req.userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: ExpressRequestInterface, res: Response) => {
  const { id } = req.params;

  const job = await Job.findOneAndRemove({
    _id: id,
    createdBy: req.userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${id}`);
  }
  res.status(StatusCodes.OK).send();
};
