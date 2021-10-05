import axios, { AxiosResponse } from "axios";
import { ApiDataType, ITodo } from "./type";
const baseURL: string = process.env.BACKEND_URL || "http://localhost:5000";

export const getTodos = async (): Promise<AxiosResponse<ApiDataType> | undefined> => {
  try {
    const todos: AxiosResponse<ApiDataType> = await axios.get(baseURL + "/todos");
    return todos;
  } catch (err) {
    console.log(err);
  }
};

export const addTodo = async (formData: ITodo): Promise<AxiosResponse<ApiDataType> | undefined> => {
  try {
    const todo: Omit<ITodo, "_id"> = {
      name: formData.name,
      description: formData.description,
      status: false,
    };

    const saveTodo: AxiosResponse<ApiDataType> = await axios.post(`${baseURL}/add-todo`, todo);
    return saveTodo;
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (todo: ITodo): Promise<AxiosResponse<ApiDataType> | undefined> => {
  try {
    console.log(todo);

    const todoUpdate: Pick<ITodo, "status"> = {
      status: true,
    };
    const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
      `${baseURL}/edit-todo/${todo._id}`,
      todoUpdate
    );
    return updatedTodo;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (_id: string): Promise<AxiosResponse<ApiDataType> | undefined> => {
  try {
    const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseURL}/delete-todo/${_id}`
    );
    return deletedTodo;
  } catch (error) {
    console.log(error);
  }
};
