import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Paper, Card, CardContent, Badge, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
const SidebarItem = ({ item, count, itemIcon, isActive }) => {
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
          },
          "&.active": {
            bgcolor: "rgba(0, 0, 0, 0.1)",
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
              // opacity: "0.7",
            }}
            color={"textSecondary"}
          >
            Task {item}
          </Typography>
          <Badge sx={{ opacity: 0.8 }}>{count}</Badge>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default SidebarItem;
