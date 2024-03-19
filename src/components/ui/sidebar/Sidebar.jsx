import React from "react";
import {
  CardContent,
  Card as CardMui,
  Typography,
  Box,
  Paper,
} from "@mui/material";
const Sidebar = () => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flex: 0.25,
        flexShrink: 0,
        flexDirection: "column",
        height: "100%",
        // gap: "1rem",
        overflow: "auto",
      }}
    >
      {[
        1, 2, 3, 4, 5, 5, 6, 6, 6, 3, 2, 2, 3, 2, 3, 1, 1, 1, 1, 1, 1, 12, 4,
        11,
      ].map((item, index) => {
        return (
          <Paper
            sx={{ borderRadius: "none", border: "none", boxShadow: "none" }}
          >
            <CardMui>
              <CardContent
                sx={{
                  overflow: "hidden",
                  padding: "13px 1rem !important",
                  display: "flex",
                  border: "none !important",
                  gap: "1rem",
                  alignItems: "center",
                }}
              >
                <Typography
                  noWrap
                  variant="body1"
                  sx={{ wordBreak: "break-all", height: "100%" }}
                >
                  Task {index}
                </Typography>
              </CardContent>
            </CardMui>
          </Paper>
        );
      })}
    </Box>
  );
};

export default Sidebar;
