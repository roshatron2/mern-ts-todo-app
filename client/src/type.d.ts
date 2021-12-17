import { type } from "os";

interface ITodo {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

type TodoProps = {
  todo: ITodo;
};

type ApiDataType = {
  message: string;
  todos: ITodo[];
  todo?: todo;
};
