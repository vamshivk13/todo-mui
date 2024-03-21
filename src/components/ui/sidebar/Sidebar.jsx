import React from "react";
import {
  CardContent,
  Card,
  Typography,
  Box,
  Paper,
  colors,
  Badge,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const Sidebar = () => {
  return (
    <Paper
      sx={{
        display: "flex",
        flex: 0.25,
        flexShrink: 0,
        flexDirection: "column",
        height: "100%",
        // gap: "1rem",
        overflow: "auto",
        boxShadow:
          "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {[1, 2, 3, 4, 5, 5, 6].map((item, index) => {
        return (
          // <Paper
          //   sx={{
          //     borderRadius: "none",
          //     border: "none",
          //     boxShadow: "none",
          //   }}
          // >
          <Card
            sx={{
              boxShadow: "none",
              "&:hover": {
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
              <FormatListBulletedIcon sx={{ fontSize: "1rem" }} />
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
                Task {index}
              </Typography>
              <Badge sx={{ opacity: 0.8 }}>{item}</Badge>
            </CardContent>
          </Card>
          // </Paper>
        );
      })}
    </Paper>
  );
};

export default Sidebar;
