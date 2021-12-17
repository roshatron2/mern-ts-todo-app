import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import express, { Application, Request, Response } from "express";
import cors from "cors";
import connectToDb from "./utils/db";
import todoRoutes from "./routes/todos";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();
app.use("/", todoRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("listening on port " + process.env.PORT));
   