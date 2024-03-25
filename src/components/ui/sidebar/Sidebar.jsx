import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Divider,
  TextField,
  InputBase,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "../../../hooks/useLocalStorage";

const Sidebar = () => {
  const sidebarItems = [
    {
      name: "My Day",
      count: 0,
    },
    {
      name: "Important",
      count: 0,
    },
    {
      name: "My Tasks",
      count: 0,
    },
  ];
  const [customSidebarItems, setCustomSidebarItems] = useLocalStorage(
    "customSideBarItems",
    []
  );
  const [newListItem, setNewListItem] = useState("");
  function handleNewListItem(e) {
    e.preventDefault();
    if (newListItem == "") {
      return;
    }
    setCustomSidebarItems((prev) => [
      ...prev,
      { id: Math.random() * 10, name: newListItem, count: 0 },
    ]);
    setNewListItem("");
  }
  function handleDeleteSidebarItem(id) {
    setCustomSidebarItems((prev) => prev.filter((item) => item.id != id));
  }
  return (
    <Box
      sx={{
        flex: 0.25,
        height: "100%",
        position: "relative",
        scrollbarColor: "red",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          height: "calc(100% - 50px)",
          flexShrink: 0,
          flexDirection: "column",
          overflowY: "auto",
          // scrollbarWidth: "thin",
          boxShadow:
            "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ marginTop: "20px" }}>
          {sidebarItems.map((item) => {
            return (
              <SidebarItem
                item={item.name}
                count={item.count}
                itemIcon={item.name}
                isActive={item.name == "My Day" ? true : false}
              />
            );
          })}
        </Box>
        <Divider sx={{ my: 1, width: "90%", marginX: "auto" }} />
        <Box>
          {customSidebarItems.map((item) => {
            return (
              <SidebarItem
                id={item.id}
                type="custom"
                item={item.name}
                count={item.count}
                handleDeleteSidebarItem={handleDeleteSidebarItem}
              />
            );
          })}
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
          component={"form"}
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            // gap: "1rem",
            paddingX: "13px",
          }}
          onSubmit={handleNewListItem}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
          <InputBase
            sx={{ width: 1, paddingRight: "10px" }}
            placeholder="New List"
            value={newListItem}
            onChange={(e) => setNewListItem(e.target.value)}
            // onChange={handleNewListItem}
          ></InputBase>
        </Paper>
      </Box>
    </Box>
  );
};

export default Sidebar;
