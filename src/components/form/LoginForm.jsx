import {
  Alert,
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
import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

import { authContext } from "../../store/AuthProvider";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Cookies from "js-cookie";
import { alertContext } from "../../store/AlertProvider";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { user, setUser } = useContext(authContext);
  const { setAlert } = useContext(alertContext);
  const [formError, setFormError] = useState({
    email: null,
    password: null,
    displayName: null,
  });

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser((prev) => {
          return {
            ...prev,
            isAuthenticated: true,
            accessToken: user.accessToken,
            displayName: user.displayName,
            userId: user.uid,
          };
        });
      } else {
        setUser((prev) => {
          return {
            ...prev,
            isAuthenticated: false,
            accessToken: null,
            userId: null,
            displayName: null,
          };
        });
      }
    });
  }, []);

  function handleUsername(e) {
    setFormError((prev) => {
      return {
        ...prev,
        email: null,
      };
    });
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setFormError((prev) => {
      return {
        ...prev,
        password: null,
      };
    });
    setPassword(e.target.value);
  }

  function handleDisplayName(e) {
    setDisplayName(e.target.value);
  }

  function clearInputFields() {
    setPassword("");
    setEmail("");
    setDisplayName("");
  }
  const registerUser = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        return Promise.resolve(auth.currentUser);
        // ...
      })
      .then((currentUser) => {
        console.log("Updating the user profile name");
        updateProfile(currentUser, {
          displayName,
        }).then(() => {
          setUser((prev) => {
            return { ...prev, displayName };
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setAlert((prev) => {
          return {
            ...prev,
            alertMessage: errorMessage.split(": ")[1],
            alertType: "error",
          };
        });
        console.log(error);
        // ..
      });
  };

  function loginUser(e) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const userData = userCredential.user;
        console.log(userData);

        Cookies.set("token", userData.accessToken);
        setUser((user) => {
          return {
            ...user,
            isAuthenticated: true,
            accessToken: userData.accessToken,
            displayName: userData.displayName,
          };
        });

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setAlert((prev) => {
          return {
            ...prev,
            alertMessage: errorMessage,
            alertType: "error",
          };
        });
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let isValid = true;

    if (!email.includes("@")) {
      setFormError((prev) => {
        return {
          ...prev,
          email: "enter a valid email address",
        };
      });
      isValid = false;
    }

    if (password.length < 6) {
      setFormError((prev) => {
        return {
          ...prev,
          password: "password must be min of 6 char long",
        };
      });
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if (isLogin) {
      loginUser();
    } else {
      registerUser();
    }
  }

  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        borderRadius: "10px",
        flex: "2",
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "14px",
        }}
      >
        <ListAltIcon
          sx={{ fontSize: "30px", display: { xs: "block", sm: "none" } }}
        />
        <Typography variant="h4">
          User {isLogin ? "Login" : "Register"}
        </Typography>
      </Box>
      <Box
        sx={{
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "100%",
            sm: "70%",
          },
        }}
      >
        {!isLogin && (
          <Paper variant="elevation">
            <TextField
              placeholder="display name"
              onChange={handleDisplayName}
              value={displayName}
              fullWidth
              size="small"
              id="displayName"
              name="displayName"
              required
            ></TextField>
          </Paper>
        )}
        <Paper variant="elevation">
          <TextField
            size="small"
            placeholder="email"
            type="email"
            id="email"
            onChange={handleUsername}
            value={email}
            name="email"
            helperText={formError.email}
            required={true}
            fullWidth
          ></TextField>
        </Paper>
        <Paper variant="elevation">
          <TextField
            size="small"
            variant="outlined"
            placeholder="password"
            onChange={handlePassword}
            value={password}
            id="password"
            name="password"
            type="password"
            required
            helperText={formError.password}
            fullWidth
          ></TextField>
        </Paper>
      </Box>
      <Typography
        component={"div"}
        onClick={() => {
          setIsLogin((prev) => !prev);
          clearInputFields();
          setFormError({
            email: null,
            password: null,
            displayName: null,
          });
        }}
        sx={{ cursor: "pointer", marginTop: "5px" }}
      >
        {isLogin ? "New User?" : "Have an Account?"}
      </Typography>
      <Button type="submit" variant="outlined" sx={{ marginTop: "5px" }}>
        {isLogin ? "Login" : "Register"}
      </Button>
    </Box>
  );
};

export default LoginForm;
