import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { themeContext } from "../../../store/ColorThemeProvider";
import useFetch from "../../../hooks/useFetch";
import { colors } from "../../../util/getThemeColors";

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
  const theme = useTheme();
  const defaultColor =
    theme.palette.mode == "dark"
      ? theme.palette.common.white
      : theme.palette.common.black;
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
    color = color == defaultColor ? null : color;
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

  const ColoredMenuItem = ({ color }) => {
    return (
      <MenuItem
        onClick={() => {
          handleChangeColor(color);
          setAnchor(null);
          setThemeAnchor(null);
        }}
      >
        <Chip variant="filled" sx={{ bgcolor: color }} />
      </MenuItem>
    );
  };

  return (
    <>
      <IconButton onClick={handleMoreOptions}>
        <MoreHorizIcon />
      </IconButton>
      <Menu open={open} onClose={handleClose} anchorEl={anchor}>
        <MenuItem onClick={handleColorMenu}>Change Theme</MenuItem>
        <MenuItem>Delete List</MenuItem>
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
          {[...colors, defaultColor].map((color, index) => (
            <ColoredMenuItem key={index} color={color} />
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export default MoreMenu;
