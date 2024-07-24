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
import React from "react";

const LoginForm = () => {
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
        flex: "2",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "10px" }}>
        User Login
      </Typography>
      <Paper sx={{ padding: "7px 1rem", width: "70%" }}>
        <InputBase placeholder="username"></InputBase>
      </Paper>
      <Paper sx={{ padding: "7px 1rem", width: "70%" }}>
        <InputBase placeholder="password"></InputBase>
      </Paper>
      <Button variant="outlined" sx={{ marginTop: "10px" }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
