import { Request } from "express";
import { UserDocument } from "./user.interface.js";

export interface ExpressRequestInterface extends Request {
  user?: UserDocument;
  userId?: string;
  ifTestUser?: boolean;
}
