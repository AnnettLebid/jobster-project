import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";

import { UserDocument } from "../types/user.interface.js";

const { Schema, model } = mongoose;

export const UserSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 50,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 50,
    default: "my city",
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
  },
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const payload = { userId: this._id.toString(), name: this.name };
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  
  return jwt.sign(payload, secret, {
    expiresIn: (process.env.JWT_LIFETIME || '30d') as any
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export const User = model<UserDocument>("User", UserSchema);
