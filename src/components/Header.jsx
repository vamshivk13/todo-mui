import {
  Alert,
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { authContext } from "../store/AuthProvider";
import { useNavigate } from "react-router";
import { alertContext } from "../store/AlertProvider";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import {
  getUserAccountTooltipName,
  getUserDisplayName,
} from "../util/getAccountdetails";

const Header = ({ setMode, mode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const { user } = useContext(authContext);
  const {
    alert: { alertType, alertMessage },
    setAlert,
  } = useContext(alertContext);
  const auth = getAuth();

  function handleDarkMode() {
    setMode((prev) => {
      if (prev == "light") {
        return "dark";
      } else return "light";
    });
  }

  function handleOpenAccount(e) {
    setAnchorEl(e.currentTarget);
    setIsDropDownOpen(true);
  }

  function handleClose() {
    setIsDropDownOpen(false);
  }

  function handleLogout() {
    signOut(auth);
    handleClose();
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
      <Toolbar variant="dense">
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
          <Typography fontFamily="sans-serif" fontWeight={500} variant="h6">
            Task It
          </Typography>
        </Box>
        <Box
          sx={{
            gap: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title={mode == "light" ? "Light Mode" : "Dark Mode"}>
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
          </Tooltip>
          <Tooltip title={getUserAccountTooltipName(user?.displayName)}>
            <IconButton>
              <Avatar onClick={handleOpenAccount}>
                {getUserDisplayName(user?.displayName)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isDropDownOpen}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          sx={{ marginTop: "14px" }}
        >
          <MenuItem sx={{ textTransform: "capitalize" }} onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Hi {user.displayName || "user"}!</ListItemText>
          </MenuItem>
          {user.isAuthenticated && (
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <MeetingRoomIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
      {alertMessage && (
        <Alert
          sx={{
            position: "fixed",
            top: {
              sm: "70px",
            },
            bottom: {
              sm: "inherit",
              xs: "20px",
            },
            right: 0,
          }}
          severity={alertType}
          onClose={() => {
            setAlert({
              alertType: "info",
              alertMessage: null,
            });
          }}
        >
          {alertMessage}
        </Alert>
      )}
    </AppBar>
  );
};

export default Header;
