import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();

  function handleUsername(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const registerUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };

  function loginUser() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        borderRadius: "10px",
        // bgcolor: "red",
        flex: "2",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        User Login
      </Typography>
      <Paper sx={{ padding: "7px 1rem", width: "70%" }}>
        <InputBase placeholder="username" onChange={handleUsername}></InputBase>
      </Paper>
      <Paper sx={{ padding: "7px 1rem", width: "70%" }}>
        <InputBase placeholder="password" onChange={handlePassword}></InputBase>
      </Paper>
      <Typography
        component={"div"}
        onClick={() => setIsLogin((prev) => !prev)}
        sx={{ cursor: "pointer", marginTop: "5px" }}
      >
        {isLogin ? "New User?" : "Have an Account?"}
      </Typography>
      {isLogin ? (
        <Button
          onClick={loginUser}
          variant="outlined"
          sx={{ marginTop: "5px" }}
        >
          Login
        </Button>
      ) : (
        <Button
          onClick={registerUser}
          variant="outlined"
          sx={{ marginTop: "5px" }}
        >
          Regsiter
        </Button>
      )}
    </Box>
  );
};

export default LoginForm;
