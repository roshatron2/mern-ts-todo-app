require("dotenv").config();
import express, { Application, Request, Response } from "express";
import cors from 'cors'
import connectToDb from "./utils/db";
import todoRoutes from "./routes/todos"

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectToDb();
app.use("/",todoRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(process.env.PORT || 5000, () => console.log("listening on port 5000"));
