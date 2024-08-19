import { Alert, Box, keyframes, Paper } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "../components/form/LoginForm";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { authContext } from "../store/AuthProvider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import LoadingAnimation from "../components/animation/LoadingAnimation";

const LoginPage = () => {
  const { user, setUser } = useContext(authContext);
  const navigate = useNavigate();
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
            userId: user?.uid,
            isLoading: false,
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
            isLoading: false,
            // isLoading: false,
          };
        });
      }
    });
  }, []);

  useEffect(() => {
    if (user.isAuthenticated) {
      navigate("/home");
    }
  }, [user.isAuthenticated]);
  const expand = keyframes(() => {
    return {
      from: {
        transformX: "10px",
      },
      to: {
        transformX: "100px",
      },
    };
  });

  if (user.isLoading) {
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* <Box
          sx={{
            width: "100px",
            bgcolor: "red",
            "&:before": {
              content: '"Loading..."',
            },
            
          }}
        ></Box> */}
        <LoadingAnimation isTyping={user.isLoading} />
        {/* {user.isLoading && <CircularProgress />} */}
      </Box>
    );
  }
  if (!user.isAuthenticated && !user.isLoading)
    return (
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: {
            sm: "50%",
            xs: "40%",
          },
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "500px" },
        }}
      >
        <Paper sx={{ display: "flex", padding: "30px" }} variant="outlined">
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              justifyContent: "flex-end",
              alignItems: "center",
              flex: 1,
            }}
          >
            <ListAltIcon sx={{ fontSize: "7rem" }} />
          </Box>
          <LoginForm />
        </Paper>
      </Box>
    );
};

export default LoginPage;
