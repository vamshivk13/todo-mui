import { Box, Paper } from "@mui/material";
import React from "react";
import LoginForm from "../components/form/LoginForm";
import ListAltIcon from "@mui/icons-material/ListAlt";

const LoginPage = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Paper
        sx={{ display: "flex", height: "300px", width: "500px" }}
        variant="outlined"
      >
        <Box
          sx={{
            display: "flex",
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
