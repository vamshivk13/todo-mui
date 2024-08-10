import React from "react";
import TodayIcon from "@mui/icons-material/Today";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const ListIcon = ({ itemIcon, color }) => {
  let icon = <FormatListBulletedIcon sx={{ fontSize: "1.25rem" }} />;
  if (itemIcon == "MyDay") {
    icon = <TodayIcon sx={{ fontSize: "1.25rem" }} />;
  } else if (itemIcon == "Important") {
    icon = <StarBorderIcon sx={{ fontSize: "1.25rem" }} />;
  } else if (itemIcon == "MyTasks") {
    icon = <TaskAltIcon sx={{ fontSize: "1.25rem" }} />;
  }
  return (
    <ThemeProvider
      theme={(theme) =>
        createTheme({
          ...theme,
          components: {
            ...theme.components,
            MuiSvgIcon: {
              styleOverrides: {
                root: {
                  color: color, // Default color for icons
                },
              },
            },
          },
        })
      }
    >
      {icon}
    </ThemeProvider>
  );
};

export default ListIcon;
