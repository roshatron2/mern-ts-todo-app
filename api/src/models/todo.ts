import { Schema, model, connect } from "mongoose";
import { ITodo } from "../types/todos";

const todoSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, default: false },
});

export default model<ITodo>("Todos", todoSchema);
