import { Response } from "express";
import mongoose from "mongoose";
import moment from "moment";
import { StatusCodes } from "http-status-codes";
import { Job } from "../models/Job.js";
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

export const showStats = async (req: ExpressRequestInterface, res: Response) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const formatStats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: formatStats.pending || 0,
    interview: formatStats.interview || 0,
    declined: formatStats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
