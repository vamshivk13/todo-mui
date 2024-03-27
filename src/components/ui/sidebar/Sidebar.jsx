import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Divider,
  TextField,
  InputBase,
  Drawer,
  Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarItem from "./SidebarItem";
import MenuIcon from "@mui/icons-material/Menu";
import { v4 as uuidv4 } from "uuid";

const Sidebar = ({
  currentSidebarItemId,
  setCurrentSidebarItemId,
  sidebarItems,
  setCustomSidebarItems,
  customSidebarItems,
  setIsSidebarOpen,
  isSidebarOpen,
  tasks,
  setTasks,
  handleDeleteSidebarItem,
}) => {
  const [newListItem, setNewListItem] = useState("");

  function handleNewListItem(e) {
    e.preventDefault();
    if (newListItem == "") {
      return;
    }
    const id = uuidv4();
    setCustomSidebarItems((prev) => [
      ...prev,
      { id: id, name: newListItem, count: 0 },
    ]);
    setNewListItem("");
    setCurrentSidebarItemId(id);
  }
  const sidebar = (
    <>
      <Toolbar sx={{ minHeight: { xs: "60px" } }} />
      <Box
        sx={{
          // flex: 0.25,
          // maxWidth: "20%",
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
            boxShadow:
              "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ alignItems: "center", display: "flex", py: "1rem" }}>
            <IconButton
              sx={{ marginLeft: "13px" }}
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{}}>
            {sidebarItems.map((item) => {
              return (
                <SidebarItem
                  key={item.id}
                  id={item.id}
                  setCurrentSidebarItemId={setCurrentSidebarItemId}
                  item={item.name}
                  count={
                    tasks.filter(
                      (task) =>
                        task.listTypeId == item.id && task.isDone == false
                    ).length
                  }
                  itemIcon={item.name}
                  isActive={item.id == currentSidebarItemId ? true : false}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              );
            })}
          </Box>
          <Divider sx={{ my: 1, width: "90%", marginX: "auto" }} />
          <Box>
            {customSidebarItems.map((item) => {
              return (
                <SidebarItem
                  key={item.id}
                  id={item.id}
                  type="custom"
                  item={item.name}
                  count={
                    tasks.filter(
                      (task) =>
                        task.listTypeId == item.id && task.isDone == false
                    ).length
                  }
                  setCurrentSidebarItemId={setCurrentSidebarItemId}
                  handleDeleteSidebarItem={handleDeleteSidebarItem}
                  isActive={item.id == currentSidebarItemId ? true : false}
                  setIsSidebarOpen={setIsSidebarOpen}
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
    </>
  );
  return (
    <>
      {isSidebarOpen && (
        <Drawer
          variant="permanent"
          open={isSidebarOpen}
          sx={{
            width: "20%",
            // flex: "0.25",
            flexShrink: 0,
            height: "100%",
            display: { xs: "none", md: "block" },
            [`& .MuiDrawer-paper`]: {
              width: "20%",

              // boxSizing: "border-box",
            },
          }}
        >
          {sidebar}
        </Drawer>
      )}
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onClick={() => setIsSidebarOpen(false)}
        sx={{
          // width: "20%",
          flex: "0.25",
          flexShrink: 0,
          height: "100%",
          display: { md: "none" },
          [`& .MuiDrawer-paper`]: {
            // width: "20%",
            boxSizing: "border-box",
          },
        }}
      >
        {sidebar}
      </Drawer>
    </>
  );
};

export default Sidebar;
