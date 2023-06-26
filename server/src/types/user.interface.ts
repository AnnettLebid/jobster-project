import { Document } from "mongoose";

export interface UserInterface {
  name: string;
  lastName: string;
  location: string;
  email: string;
  password: string;
}

export interface UserMethods {
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserDocument extends UserInterface, UserMethods, Document {}
