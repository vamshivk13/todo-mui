import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Header = () => {
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          height: "60px",
          display: "flex",
          justifyContent: "center",
          // color: "black",
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
          <AccountCircleIcon sx={{ fontSize: "2rem" }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
