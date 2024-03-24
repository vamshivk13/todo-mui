import React from "react";
import { Typography, Box, Paper, IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const sidebarItems = ["My Day", "Important", "My Tasks"];
  return (
    <Box sx={{ flex: 0.25, height: "100%", position: "relative" }}>
      <Paper
        sx={{
          display: "flex",
          height: "calc(100% - 50px)",
          flexShrink: 0,
          flexDirection: "column",
          overflowY: "auto",
          scrollbarWidth: "thin",
          boxShadow:
            "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ marginTop: "20px" }}>
          {sidebarItems.map((item) => {
            return (
              <SidebarItem
                item={item}
                count={2}
                itemIcon={item}
                isActive={item == "My Day" ? true : false}
              />
            );
          })}
        </Box>
        <Divider sx={{ my: 1, width: "90%", marginX: "auto" }} />
        <Box>
          {[1, 2, 3, 4, 5, 5, 6, 1, 2, 3, 4, 5, 5, 6, 1, 2, 3, 4, 5, 5, 6].map(
            (item) => {
              return <SidebarItem item={item} count={item} />;
            }
          )}
        </Box>
      </Paper>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
        }}
      >
        <Paper
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            // gap: "1rem",
            paddingX: "13px",
          }}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
          <Typography variant="body1" sx={{ marginRight: "auto" }}>
            New List
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Sidebar;
