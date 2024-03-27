import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
const Header = ({ setMode, mode }) => {
  function handleDarkMode() {
    setMode((prev) => {
      if (prev == "light") {
        return "dark";
      } else return "light";
    });
  }
  return (
    <AppBar
      position="fixed"
      sx={{
        height: "60px",
        display: "flex",
        justifyContent: "center",
        boxShadow:
          "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
            alignItems: "center",
            mr: "auto",
          }}
        >
          <ListAltIcon sx={{ fontSize: "2rem" }} />
          <Typography variant="body1">Todo</Typography>
        </Box>
        <Box sx={{ gap: "1rem", display: "flex" }}>
          <IconButton onClick={handleDarkMode}>
            {mode == "light" ? (
              <LightModeIcon
                sx={{
                  fontSize: "2rem",
                }}
              />
            ) : (
              <DarkModeIcon sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
          <IconButton>
            <AccountCircleIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
