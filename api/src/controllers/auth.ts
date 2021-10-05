import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { IUser } from "../types/user";
import { asyncHandler } from "../middlewares/asyncHandler";

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email || !password) {
      return next({
        message: "Please provide email and password",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return next({
        message: "The email is not yet registered to an accout",
        statusCode: 400,
      });
    }

    const match = await user.checkPassword(password);
    console.log(match);

    if (!match) {
      return next({ message: "The password does not match", statusCode: 400 });
    }
    const token = user.getJwtToken();

    res.status(200).json({ success: true, token });
  }
);

const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, username, email, password } = req.body;

    const user = await User.create({ name, username, email, password });

    const token = user.getJwtToken();

    res.status(200).json({ success: true, token });
  }
);

const me = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  const { avatar, username, name, email, _id } = req.user;

  res.status(200).json({
    success: true,
    data: { avatar, username, name, email, _id },
  });
});
export { login, register, me };
