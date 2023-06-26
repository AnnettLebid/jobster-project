import { Request, Response } from "express";
import { User } from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { ExpressRequestInterface } from "../types/expressRequest.interface.js";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token,
    },
  });
};

export const updateUser = async (req: ExpressRequestInterface, res: Response) => {
  const { email, name, lastName, location } = req.body;

  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide email, name, lastName and location");
  }

  const user = await User.findOne({ _id: req.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      email: user.email,
      token,
    },
  });
};
