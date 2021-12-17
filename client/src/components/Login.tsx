import React, { useContext } from "react";
import { toast } from "react-toastify";
// import styled from "styled-components";
import { client } from "../utils";
import useInput from "../hooks/useInput";
import { UserContext } from "../context/UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type Props = {
  signup: any;
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "20%",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    marginTop: "2rem",
  },
  input: {
    marginTop: "1rem",
  },
};
const Login: React.FC<Props> = ({ signup }) => {
  const { setUser }: any = useContext(UserContext);
  const email = useInput("");
  const password = useInput("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email.value || !password.value) {
      return toast.error("Please fill in both the fields");
    }

    const body = { email: email.value, password: password.value };

    try {
      const { token } = await client("/auth/login", { body });
      localStorage.setItem("token", token);
    } catch (err: any) {
      return toast.error(err.message);
    }

    const user = await client("/auth/me");
    localStorage.setItem("user", JSON.stringify(user.data));
    setUser(user.data);
    toast.success("Login successful");

    email.setValue("");
    password.setValue("");
  };

  return (
    <div onSubmit={handleLogin} style={styles.login as React.CSSProperties}>
      <form style={styles.form as React.CSSProperties}>
        <TextField
          style={styles.input}
          id="email"
          label="Email"
          type="email"
          placeholder="haileyattwell@xyz.com"
          value={email.value}
          onChange={email.onChange}
        />
        <TextField
          style={styles.input}
          id="password"
          label="Password"
          type="password"
          placeholder="unguessablepassword"
          value={password.value}
          onChange={password.onChange}
        />
        <Button style={{ marginTop: "2rem" }} variant="outlined" color="primary" type="submit">
          Login
        </Button>
      </form>
      <div>
        <p>
          Don't have an account? <span onClick={signup}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
