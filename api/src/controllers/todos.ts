import { Response, Request } from "express";
import { ITodo } from "./../types/todos";
import Todo from "../models/todo";

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (err) {
    console.log(err);
  }
};

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status } = req.body;
    const todo: ITodo = new Todo({
      name,
      description,
      status,
    });
    const newTodo: ITodo = await Todo.create(todo);
    const allTodos: ITodo[] = await Todo.find();
    res.status(201).json({ message: "Todo added", todo: newTodo, todos: allTodos });
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoId = req.params.id;
    const { body } = req;
    const updatedTodo: ITodo | null = await Todo.findByIdAndUpdate(todoId, body);
    const allTodos = await Todo.find();
    res.status(200).json({ message: "Todo updated", todo: updatedTodo, todos: allTodos });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deleteTodo: ITodo | null = await Todo.findByIdAndRemove(id);
    const allTodos = await Todo.find();
    res.status(200).json({ message: "Todo deleted", todo: deleteTodo, todos: allTodos });
  } catch (err) {
    console.log(err);
  }
};

export { getTodos, deleteTodo, addTodo, updateTodo };
