import React, { useState } from "react";
import { ITodo } from "../type";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";

const styles = {
  input: {
    width: "600px",
  },
};

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo | any) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | {}>();

  const handleForm = (e: any): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };
  const handleSave: any = (e: React.FormEvent) => {
    saveTodo(e, formData);
  };
  return (
    <form>
      <div>
        <div>
          <TextField
            style={styles.input}
            variant="standard"
            label="Name"
            type="text"
            onChange={handleForm}
            id="name"
          />
        </div>
        <div>
          <TextField
            style={styles.input}
            variant="standard"
            label="Description"
            type="text"
            onChange={handleForm}
            id="description"
          />
        </div>
        <Box textAlign="center" style={{ marginTop: "1rem" }}>
          <Button
            color="primary"
            variant="contained"
            disabled={formData === undefined ? true : false}
            onClick={(e) => saveTodo(e, formData)}
          >
            Add Todo
          </Button>
        </Box>
      </div>
    </form>
  );
};

export default AddTodo;
