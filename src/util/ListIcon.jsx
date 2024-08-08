import React from "react";
import TodayIcon from "@mui/icons-material/Today";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const ListIcon = ({ itemIcon }) => {
  let icon = <FormatListBulletedIcon sx={{ fontSize: "1.25rem" }} />;
  if (itemIcon == "MyDay") {
    icon = <TodayIcon sx={{ fontSize: "1.25rem" }} />;
  } else if (itemIcon == "Important") {
    icon = <StarBorderIcon sx={{ fontSize: "1.25rem" }} />;
  } else if (itemIcon == "MyTasks") {
    icon = <TaskAltIcon sx={{ fontSize: "1.25rem" }} />;
  }
  return <>{icon}</>;
};

export default ListIcon;
