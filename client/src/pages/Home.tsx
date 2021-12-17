import { UserContext } from "../context/UserContext";
// import { client } from "../utils";
import Button from "@mui/material/Button";
import { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../API";
import "../App.css";
import AddTodo from "../components/AddTodo";
import TodoItem from "../components/TodoItem";
import { ApiDataType, ITodo } from "../type";
import Grid from "@mui/material/Grid";

const styles = {
  nav: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem",
  },
};

const Home = () => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      let res: AxiosResponse<ApiDataType> | undefined = await getTodos();
      if (res?.status !== 200) throw new Error("Error! Unable to fetch Todos");
      setTodos(res.data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSaveTodo = async (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault();
    addTodo(formData)
      .then(({ status, data }: ITodo[] | any) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved");
        }
        setTodos(data.todos);
      })
      .catch((err: any) => console.log(err));
  };

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id).then(({ status, data }: ITodo[] | any) => {
      if (status !== 200) {
        throw new Error("Error! Todo not deleted");
      }
      setTodos(data.todos);
    });
  };
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo).then(({ status, data }: ITodo[] | any) => {
      if (status !== 200) {
        throw new Error("Error! Todo not updated");
      }
      setTodos(data.todos);
    });
  };

  return (
    <>
      <div style={styles.nav}>
        <Button variant="contained" color="secondary" onClick={logout}>
          Logout
        </Button>
      </div>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      <Grid style={{ padding: "1rem" }} container spacing={2}>
        {todos.map((todo: ITodo) => (
          <Grid item xs={4}>
            <TodoItem
              key={todo._id}
              updateTodo={handleUpdateTodo}
              deleteTodo={handleDeleteTodo}
              todo={todo}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;
