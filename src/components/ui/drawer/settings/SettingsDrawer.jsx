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
import SettingsItem from "./SettingsItem";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import useFetch from "../../../../hooks/useFetch";

const SettingsDrawer = () => {
  const {
    isSettingsOpened,
    setIsSettingsOpened,
    setSettingsState,
    settingsState,
  } = useContext(appStateContext);

  const [, updateSettingsState] = useFetch("UPDATE", "/settings/");
  const [, postSettingsState] = useFetch("POST", "/settings.json");

  async function handleSoundSetting(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSettingsState((prev) => {
        return {
          ...prev,
          isSoundEnabled: isChecked,
        };
      });
    } else {
      setSettingsState((prev) => {
        return {
          ...prev,
          isSoundEnabled: isChecked,
        };
      });
    }
    if (!settingsState.key) {
      const { name } = await postSettingsState({
        ...settingsState,
        isSoundEnabled: isChecked,
      });
      setSettingsState((prev) => {
        return { ...prev, key: name };
      });
    } else {
      const settings = settingsState;
      const key = settings.key;
      delete settings.key;
      updateSettingsState({
        route: key + ".json",
        data: { ...settingsState, isSoundEnabled: isChecked },
      });
    }
  }

  async function handleDeleteAlertSetting(e) {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSettingsState((prev) => {
        return {
          ...prev,
          isDeleteAlertEnabled: isChecked,
        };
      });
    } else {
      setSettingsState((prev) => {
        return {
          ...prev,
          isDeleteAlertEnabled: isChecked,
        };
      });
    }
    if (!settingsState.key) {
      const { name } = await postSettingsState({
        ...settingsState,
        isDeleteAlertEnabled: isChecked,
      });
      setSettingsState((prev) => {
        return { ...prev, key: name };
      });
    } else {
      const settings = settingsState;
      const key = settings.key;
      delete settings.key;
      updateSettingsState({
        route: key + ".json",
        data: { ...settingsState, isDeleteAlertEnabled: isChecked },
      });
    }
  }

  return (
    <Drawer
      anchor="right"
      open={isSettingsOpened}
      PaperProps={{
        sx: {
          minWidth: "20%",
          height: "100%",
          bgcolor: useTheme().palette.mode == "light" && "#FAF8F9",
        },
      }}
      hideBackdrop={false}
      variant="temporary"
      onClose={() => setIsSettingsOpened(false)}
    >
      <Toolbar />
      <Box
        sx={{
          padding: "1rem 15px",
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
          <IconButton
            onClick={() => {
              setIsSettingsOpened(false);
            }}
          >
            <CloseSharpIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h6"
          fontSize={"1.2rem"}
          sx={{ marginBottom: "18px" }}
        >
          General
        </Typography>
        <SettingsItem
          title={"Enable Task Completion Sound"}
          isChecked={settingsState.isSoundEnabled}
          onChange={handleSoundSetting}
        />
        <SettingsItem
          title={"Alert Before Task Deletion"}
          isChecked={settingsState.isDeleteAlertEnabled}
          onChange={handleDeleteAlertSetting}
        />
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
