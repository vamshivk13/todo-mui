import {
  Box,
  Drawer,
  IconButton,
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { appStateContext } from "../../../../store/ApplicationStateProvider";

const SettingsDrawer = () => {
  const { isSettingsOpened, setIsSettingsOpened } = useContext(appStateContext);
  return (
    <Drawer
      anchor="right"
      open={isSettingsOpened}
      PaperProps={{
        sx: {
          width: "20%",
          height: "100%",
        },
      }}
      onClose={() => setIsSettingsOpened(false)}
    >
      <Toolbar />
      <Box
        sx={{
          padding: "1rem 10px",
          color: useTheme().palette.mode == "dark" ? "#FFF" : "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Settings</Typography>
          <IconButton>X</IconButton>
        </Box>
        <Typography
          variant="h6"
          fontSize={"1.2rem"}
          sx={{ marginBottom: "10px" }}
        >
          General
        </Typography>
        <Box>
          <Typography
            fontWeight={"700"}
            fontSize={"13px"}
            sx={{ color: "inherit" }}
          >
            Enable Sound On Task Completion
          </Typography>
          <Switch size="medium"></Switch>
        </Box>
        <Box>
          <Typography
            fontWeight={"700"}
            fontSize={"13px"}
            sx={{ color: "inherit" }}
          >
            Enable Alert before Task Delete
          </Typography>
          <Switch></Switch>
        </Box>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
