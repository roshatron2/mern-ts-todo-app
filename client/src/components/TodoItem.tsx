import React from "react";
import { ITodo, TodoProps } from "../type";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const styles = {
  TodoDescription: {
    margin: "1rem 0",
  },
};

const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : "";
  return (
    <div>
      <Card>
        <CardContent>
          <div>
            <Typography className={checkTodo} variant="h3">
              {todo.name}
            </Typography>
            <Typography style={styles.TodoDescription} className={checkTodo}>
              {todo.description}
            </Typography>
          </div>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              color="secondary"
              onClick={() => updateTodo(todo)}
              className={todo.status ? `hide-button` : "Card--button__done"}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              color="warning"
              onClick={() => deleteTodo(todo._id)}
              className="Card--button__delete"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoItem;
