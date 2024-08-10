import { Chip, IconButton, Menu, MenuItem, Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { themeContext } from "../../../store/ColorThemeProvider";
import useFetch from "../../../hooks/useFetch";

const MoreMenu = ({
  currentSidebarItemId,
  setCustomSidebarItems,
  customSidebarItems,
}) => {
  const [anchor, setAnchor] = useState(null);
  const [themeAnchor, setThemeAnchor] = useState(null);
  const [, setCurrentColor] = useContext(themeContext);
  const [, updateCustomSidebar] = useFetch("UPDATE", "/lists/");
  const open = Boolean(anchor);
  const open1 = Boolean(themeAnchor);
  function handleMoreOptions(e) {
    setAnchor(e.currentTarget);
  }
  function handleColorMenu(e) {
    setThemeAnchor(e.currentTarget);
  }
  function handleClose() {
    setAnchor(null);
  }
  function handleThemeMenuClose() {
    setThemeAnchor(null);
  }

  function handleChangeColor(color) {
    setCurrentColor(color);
    setCustomSidebarItems((prev) => {
      return prev.map((item) => {
        if (item.id == currentSidebarItemId) {
          return {
            ...item,
            color: color,
          };
        } else return item;
      });
    });
    const curSidebarItem = customSidebarItems.find(
      (item) => item.id == currentSidebarItemId
    );
    const sidebarItemKey = curSidebarItem.key;
    delete curSidebarItem.key;

    updateCustomSidebar({
      route: sidebarItemKey + ".json",
      data: {
        ...curSidebarItem,
        color: color,
      },
    });
  }

  return (
    <>
      <IconButton onClick={handleMoreOptions}>
        <MoreHorizIcon />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchor}>
        <MenuItem onClick={handleColorMenu}>Change Theme</MenuItem>
      </Menu>
      <Menu
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={themeAnchor}
        open={open1}
        onClose={handleThemeMenuClose}
      >
        <Stack flexDirection={"row"}>
          <MenuItem
            onClick={() => {
              handleChangeColor("#2196f3");
            }}
          >
            <Chip variant="filled" sx={{ bgcolor: "#2196f3" }} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleChangeColor("#f44336");
            }}
          >
            <Chip variant="filled" sx={{ bgcolor: "#f44336" }} />
          </MenuItem>
          <MenuItem
            o
            onClick={() => {
              handleChangeColor("#4caf50");
            }}
          >
            <Chip variant="filled" sx={{ bgcolor: "#4caf50" }} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleChangeColor("#ff9800");
            }}
          >
            <Chip variant="filled" sx={{ bgcolor: "#ff9800" }} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleChangeColor("#ffeb3b");
            }}
          >
            <Chip variant="filled" sx={{ bgcolor: "#ffeb3b" }} />
          </MenuItem>
        </Stack>
      </Menu>
    </>
  );
};

export default MoreMenu;
