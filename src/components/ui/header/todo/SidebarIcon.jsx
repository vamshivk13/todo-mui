import React, { useContext } from "react";
import { appStateContext } from "../../../../store/ApplicationStateProvider";
import ListIcon from "../../../../util/ListIcon";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const SidebarIcon = ({ currentSidebarItemId }) => {
  const { isSidebarOpen, setIsTempSidebarOpen, setIsSidebarOpen, screenWidth } =
    useContext(appStateContext);

  return (
    <IconButton
      onClick={() => {
        if (screenWidth < 900) {
          setIsTempSidebarOpen((prev) => !prev);
        } else {
          setIsSidebarOpen((prev) => !prev);
        }
      }}
    >
      {isSidebarOpen ? (
        <ListIcon itemIcon={currentSidebarItemId} />
      ) : screenWidth < 600 ? (
        <ArrowBackIcon />
      ) : (
        <MenuIcon />
      )}
    </IconButton>
  );
};

export default SidebarIcon;
