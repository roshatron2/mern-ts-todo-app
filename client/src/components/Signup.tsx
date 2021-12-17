import React, { useContext } from "react";
import { toast } from "react-toastify";
import { client } from "../utils";
import useInput from "../hooks/useInput";
import { UserContext } from "../context/UserContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

type Props = {
  login: any;
};

const Signup: React.FC<Props> = ({ login }) => {
  const { setUser } = useContext(UserContext);
  const email = useInput("");
  const fullname = useInput("");
  const username = useInput("");
  const password = useInput("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!email.value || !password.value || !username.value || !fullname.value) {
      return toast.error("Please fill in all the fields");
    }

    if (username.value === "explore") {
      return toast.error("The username you entered is not acceptable, try again");
    }

    const re = /^[a-z0-9]+$/i;
    if (re.exec(username.value) === null) {
      return toast.error("The username you entered is not acceptable, try again");
    }

    const body = {
      email: email.value,
      password: password.value,
      username: username.value,
      fullname: fullname.value,
    };

    try {
      const { token } = await client("/auth/signup", { body });
      localStorage.setItem("token", token);
    } catch (err: any) {
      return toast.error(err.message);
    }

    const user = await client("/auth/me");
    setUser(user.data);
    localStorage.setItem("user", JSON.stringify(user.data));

    fullname.setValue("");
    username.setValue("");
    password.setValue("");
    email.setValue("");
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
          id="fullname"
          label="Full Name"
          type="text"
          placeholder="Hailey Attwell"
          value={fullname.value}
          onChange={fullname.onChange}
        />
        <TextField
          style={styles.input}
          id="username"
          label="Username"
          type="text"
          placeholder="itshailey"
          value={username.value}
          onChange={username.onChange}
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
          Sign Up
        </Button>
      </form>
      <div>
        <p>
          Already have an account? <span onClick={login}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
