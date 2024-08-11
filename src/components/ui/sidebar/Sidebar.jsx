import React, { useState, useEffect, useContext } from "react";
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
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarItem from "./SidebarItem";
import MenuIcon from "@mui/icons-material/Menu";
import { v4 as uuidv4 } from "uuid";
import useFetch from "../../../hooks/useFetch";

import { getBreakpoint } from "../../../util/getBreakpoints";
import { themeContext } from "../../../store/ColorThemeProvider";

const Sidebar = ({
  currentSidebarItemId,
  setCurrentSidebarItemId,
  sidebarItems,
  setCustomSidebarItems,
  customSidebarItems,
  setIsSidebarOpen,
  isSidebarOpen,
  isTempSidebarOpen,
  setIsTempSidebarOpen,
  tasks,
  setTasks,
  handleDeleteSidebarItem,
}) => {
  const [newListItem, setNewListItem] = useState("");
  const [breakpoint, setBreakpoint] = useState(
    getBreakpoint(window.innerWidth)
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [, postCustomList] = useFetch("POST", "/lists.json");
  const [currentColor, setCurrentColor] = useContext(themeContext);

  function handleNewListItem(e) {
    e.preventDefault();
    e.stopPropagation();
    if (newListItem == "") {
      return;
    }
    const id = uuidv4();
    postCustomList({
      id: id,
      name: newListItem,
      count: 0,
      color: null,
    });

    setCustomSidebarItems((prev) => [
      ...prev,
      { id: id, name: newListItem, count: 0, color: null },
    ]);
    setNewListItem("");
    setCurrentSidebarItemId(id);
    setCurrentColor(null);
  }

  useEffect(() => {
    if (window.innerWidth > 900) {
      setIsTempSidebarOpen(false);
    } else {
      setIsTempSidebarOpen(true);
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 600) {
        setIsTempSidebarOpen(false);
      } else {
        // setIsTempSidebarOpen(true);
      }

      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const sidebar = (
    <Box sx={{ height: "100%", overflow: "hidden" }}>
      <Toolbar sx={{ minHeight: { xs: "60px" } }}></Toolbar>

      <Paper
        sx={{
          display: "flex",
          height: "calc(100% - 110px)",
          flexShrink: 0,
          flexDirection: "column",
          boxShadow:
            "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
        }}
      >
        {!(isTempSidebarOpen && screenWidth < 600) && (
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              py: "1rem",
            }}
          >
            <IconButton
              sx={{ marginLeft: "13px" }}
              onClick={() => {
                if (screenWidth < 900) {
                  setIsTempSidebarOpen((prev) => !prev);
                } else {
                  setIsSidebarOpen((prev) => !prev);
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        )}
        <Box sx={{ mt: `${screenWidth < 600 ? "10px" : "0"}` }}>
          {sidebarItems.map((item) => {
            return (
              <SidebarItem
                key={item.id}
                id={item.id}
                setCurrentSidebarItemId={setCurrentSidebarItemId}
                item={item.name}
                color={item.color}
                count={
                  tasks.filter(
                    (task) => task.listTypeId == item.id && task.isDone == false
                  ).length
                }
                itemIcon={item.id}
                isActive={
                  item.id == currentSidebarItemId && screenWidth > 600
                    ? true
                    : false
                }
                setIsSidebarOpen={setIsSidebarOpen}
                setIsTempSidebarOpen={setIsTempSidebarOpen}
                currentSidebarItemId={currentSidebarItemId}
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
                    (task) => task.listTypeId == item.id && task.isDone == false
                  ).length
                }
                color={item.color}
                setCurrentSidebarItemId={setCurrentSidebarItemId}
                handleDeleteSidebarItem={handleDeleteSidebarItem}
                isActive={
                  item.id == currentSidebarItemId && screenWidth > 600
                    ? true
                    : false
                }
                setIsSidebarOpen={setIsSidebarOpen}
                setIsTempSidebarOpen={setIsTempSidebarOpen}
                currentSidebarItemId={currentSidebarItemId}
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
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setNewListItem(e.target.value)}
            // onChange={handleNewListItem}
          ></InputBase>
        </Paper>
      </Box>
    </Box>
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
              bgcolor: useTheme().palette.mode == "light" && "#FFFEFE",
            },
          }}
        >
          {sidebar}
        </Drawer>
      )}
      <Drawer
        variant="temporary"
        open={isTempSidebarOpen}
        onClose={() => {
          setIsTempSidebarOpen(false);
          setIsSidebarOpen(false);
        }}
        onClick={() => {
          setIsTempSidebarOpen(false);
          setIsSidebarOpen(false);
        }}
        sx={{
          width: {
            sm: "inherit",
            xs: "100%",
          },
          flex: "0.25",
          flexShrink: 0,
          height: "100%",
          display: { md: "none" },
          [`& .MuiDrawer-paper`]: {
            width: {
              sm: "inherit",
              xs: "100%",
            },
            boxSizing: "border-box",
            bgcolor: useTheme().palette.mode == "light" && "#FFFEFE",
          },
        }}
      >
        {sidebar}
      </Drawer>
    </>
  );
};

export default Sidebar;
