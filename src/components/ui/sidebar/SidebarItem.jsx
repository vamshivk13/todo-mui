import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  Paper,
  Card,
  CardContent,
  Badge,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const SidebarItem = ({
  type,
  item,
  count,
  itemIcon,
  isActive,
  id,
  handleDeleteSidebarItem,
}) => {
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    if (type != "custom") return;
    event.preventDefault();
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
  let icon = <FormatListBulletedIcon sx={{ fontSize: "1rem" }} />;
  if (itemIcon == "My Day") {
    icon = <TodayIcon sx={{ fontSize: "1rem" }} />;
  } else if (itemIcon == "Important") {
    icon = <StarBorderIcon sx={{ fontSize: "1rem" }} />;
  } else if (itemIcon == "My Tasks") {
    icon = <TaskAltIcon sx={{ fontSize: "1rem" }} />;
  }
  return (
    <Paper
      component={"div"}
      onContextMenu={handleContextMenu}
      sx={{
        borderRadius: "none",
        border: "none",
        boxShadow: "none",
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
            noWrap
            variant="body1"
            sx={{
              wordBreak: "break-all",
              height: "100%",
              marginRight: "auto",
              fontWeight: "inherit",
            }}
            color={"textSecondary"}
          >
            {item}
          </Typography>
          <Badge sx={{ opacity: 0.8 }}>{count}</Badge>
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
        <MenuItem onClick={() => handleDeleteSidebarItem(id)}>Delete</MenuItem>
      </Menu>
    </Paper>
  );
};

export default SidebarItem;
