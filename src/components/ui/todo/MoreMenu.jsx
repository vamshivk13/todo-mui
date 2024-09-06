import {
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { themeContext } from "../../../store/ColorThemeProvider";
import { colors } from "../../../util/getThemeColors";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import fetchAPI from "../../../hooks/fetchAPI";
import { useSelector } from "react-redux";

const MoreMenu = ({ currentSidebarItemId, handleDeleteSidebarItem }) => {
  const [anchor, setAnchor] = useState(null);
  const [themeAnchor, setThemeAnchor] = useState(null);
  const [, setCurrentColor] = useContext(themeContext);
  const sidebarItems = useSelector((state) => state.sidebar.sidebarItems);
  const customSidebarItems = useSelector(
    (state) => state.sidebar.customSidebarItems
  );
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

    // check if it is part of default side bar items.
    if (["MyDay", "Important", "MyTasks"].includes(currentSidebarItemId)) {
      setSidebarItems((prev) => {
        return prev.map((item) => {
          if (item.id == currentSidebarItemId) {
            return {
              ...item,
              color: color,
            };
          } else return item;
        });
      });
      const curSidebarItem = sidebarItems.find(
        (item) => item.id == currentSidebarItemId
      );
      const sidebarItemKey = curSidebarItem?.key;
      delete curSidebarItem?.key;

      if (sidebarItemKey) {
        fetchAPI("UPDATE", "/default-lists/", {
          route: sidebarItemKey + ".json",
          data: {
            ...curSidebarItem,
            color: color,
          },
        });
      } else {
        fetchAPI("POST", "/default-lists.json", {
          ...curSidebarItem,
          color: color,
        });
      }
    } else {
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
      const sidebarItemKey = curSidebarItem?.key;
      delete curSidebarItem?.key;

      if (sidebarItemKey)
        fetchAPI("UPDATE", "/lists/", {
          route: sidebarItemKey + ".json",
          data: {
            ...curSidebarItem,
            color: color,
          },
        });
    }
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
      <Tooltip title={"List Options Menu"} placement="right">
        <IconButton onClick={handleMoreOptions}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu open={open} onClose={handleClose} anchorEl={anchor}>
        <MenuItem onClick={handleColorMenu}>
          <ListItemIcon>
            <ColorLensIcon />
          </ListItemIcon>
          <ListItemText>Change Theme</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteSidebarItem(currentSidebarItemId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
          <ListItemText>Delete List</ListItemText>
        </MenuItem>
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
