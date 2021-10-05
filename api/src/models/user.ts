import { Schema, model, connect } from "mongoose";
import { IUser } from "../types/user";
import jwt from "jsonwebtoken";
// const jwt = require("jwt");
import bcrypt from "bcryptjs";
// const bcrypt = require("bcryptjs");

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "30d",
  });
};

userSchema.methods.checkPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
