import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  getJwtToken(): void;
  checkPassword(password: string): boolean;
}
