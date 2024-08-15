import React from "react";
import { Box, Typography, Switch } from "@mui/material";
const SettingsItem = ({ title, onChange, isChecked }) => {
  return (
    <Box sx={{ marginBottom: "8px" }}>
      <Typography
        fontWeight={"700"}
        fontSize={"13px"}
        sx={{ color: "inherit" }}
      >
        {title}
      </Typography>
      <Switch size="medium" onChange={onChange} checked={isChecked}></Switch>
    </Box>
  );
};

export default SettingsItem;
