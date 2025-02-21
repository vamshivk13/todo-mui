import React, { useContext, useEffect } from "react";

import {
  Paper,
  Card,
  CardContent,
  Badge,
  Typography,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import ListIcon from "../../../util/ListIcon";
import { themeContext } from "../../../store/ColorThemeProvider";
import { appStateContext } from "../../../store/ApplicationStateProvider";
import { todoReducerActions } from "../../../store/store";
import { useDispatch } from "react-redux";
import { appDataContext } from "../../../store/AppDataProvider";

const SidebarItem = ({
  type,
  item,
  count,
  itemIcon,
  isActive,
  id,
  handleDeleteSidebarItem,
  // setCurrentSidebarItemId,
  color,
  currentSidebarItemId,
}) => {
  const [contextMenu, setContextMenu] = React.useState(null);
  const [, setCurrentColor] = useContext(themeContext);
  const { setIsTempSidebarOpen } = useContext(appStateContext);
  const { setCurrentSidebarItemId } = useContext(appDataContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id == currentSidebarItemId) {
      setCurrentColor(color);
    }
  }, [id, currentSidebarItemId]);
  const handleContextMenu = (event) => {
    if (type != "custom") return;
    event.preventDefault();
    setCurrentSidebarItemId(id);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const icon = <ListIcon itemIcon={itemIcon} color={color} />;

  return (
    <Paper
      component={"div"}
      onContextMenu={handleContextMenu}
      sx={{
        borderRadius: "none",
        border: "none",
        boxShadow: "none",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
      onClick={() => {
        setCurrentSidebarItemId(id);
        setIsTempSidebarOpen(false);
        setCurrentColor(color);
        // dispatch(todoReducerActions.resetTodos());
        // dispatch(todoReducerActions.setTodos(id));
        // dispatch(todoReducerActions.setCompleted(id));
      }}
    >
      <Card
        className={`${isActive ? "active" : ""}`}
        sx={{
          boxShadow: "none",
          "&:hover": {
            bgcolor: "rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          },
          "&.active": {
            bgcolor: "rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          },
        }}
      >
        <CardContent
          sx={{
            overflow: "hidden",
            padding: "13px 1.5rem !important",
            display: "flex",
            border: "none !important",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {icon}
          <Typography
            variant="body1"
            sx={{
              wordBreak: "break-all",
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              height: "100%",
              marginRight: "auto",
              fontWeight: "inherit",
            }}
            color={"textSecondary"}
          >
            {item}
          </Typography>
          {false ? <Skeleton /> : <Badge sx={{ opacity: 0.8 }}>{count}</Badge>}
        </CardContent>
      </Card>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteSidebarItem(id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default SidebarItem;
