import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  Paper,
  Drawer,
  Toolbar,
  useTheme,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { CgPushChevronRightR } from "react-icons/cg";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { appStateContext } from "../../../store/ApplicationStateProvider";
import MarkAsDoneAction from "./todoactions/MarkAsDoneAction";
import MarkAsImporantAction from "./todoactions/MarkAsImportantAction";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import TodoDeleteDialog from "./todomenu/TodoDeleteDialog";

const TodoView = ({
  isOpen,
  content,
  onClose,
  handleDeleteTaskDialog,
  handleDeleteTask,
  handleMarkAsDone,
  handleEditTask,
  setIsOpen,
}) => {
  const [value, setValue] = useState(content?.notes);
  const [taskValue, setTaskValue] = useState(content?.task);
  const [customSideBarItems] = useLocalStorage("customSideBarItems");
  const [sidebarItems] = useLocalStorage("sidebarItems");
  const { screenWidth } = useContext(appStateContext);
  const date = content?.isDone
    ? new Date(content.doneAt)
    : new Date(content.createdAt);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { weekday: "long" });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (content) setValue(content?.notes);
  }, [content?.notes]);

  useEffect(() => {
    if (content) setTaskValue(content?.task);
  }, [content?.task]);

  useEffect(() => {
    return () => {
      console.log("Unmounting the Todoview Component");
      if (content?.task != taskValue) {
        console.log(content?.task, taskValue);
        handleEditTask(taskValue, false, content?.id);
      }
      if (content?.notes != value) {
        handleEditTask(value, true, content?.id);
      }
    };
  }, []);

  function getListName(id) {
    if (sidebarItems.find((item) => item.id == id)) {
      return sidebarItems.find((item) => item.id == id).name;
    } else {
      return customSideBarItems.find((item) => item.id == id).name;
    }
  }

  function handleDeleteTaskDialog(id) {
    setIsDeleteDialogOpen(true);
  }

  const todoView = (
    <Box
      sx={{
        height: "100%",
        flex: "1",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          height: "calc(100% - 50px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "0 !important",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            overflowY: "auto",
            height: "100%",
            borderRadius: "0 !important",
            bgcolor: useTheme().palette.mode == "light" && "#FAF8F9",
            boxShadow: "none",
            border: "none",
          }}
        >
          {screenWidth < 600 && (
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              gap={"12px"}
              sx={{
                padding: "10px 9px",
                zIndex: 150,
                position: "sticky",
                top: "10px",
              }}
            >
              <IconButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{
                    color: useTheme().palette.mode == "dark" ? "#FFF" : "#000",
                  }}
                />
              </IconButton>

              <Typography variant="subtitle1" sx={{ fontSize: "1.1rem" }}>
                {getListName(content.listTypeId)}
              </Typography>
            </Stack>
          )}

          <CardContent
            sx={{
              py: "1rem",
              flex: 1,
              gap: "1rem",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              // bgcolor: "red",
            }}
          >
            <Paper
              variant="elevation"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                position: "sticky",
                width: "100%",
                top: "1rem",
                zIndex: 200,
                bgcolor: useTheme().palette.mode == "light" && "white",
                fontFamily: "Roboto",
                padding: "5px 12px",
                border: "none",
                borderRadius: "5px",
                boxShadow: "none",
              }}
            >
              <MarkAsDoneAction
                isDone={content?.isDone}
                handleMarkAsDone={() => handleMarkAsDone(content?.id)}
              />
              <InputBase
                type="text"
                name="task"
                value={taskValue}
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: "600",
                  padding: "6px 0rem",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  opacity: ".8",
                }}
                onChange={(e) => {
                  if (e.target.value.length > 120) {
                    return;
                  } else setTaskValue(e.target.value);
                }}
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  )
                }
                onBlur={(e) => {
                  taskValue != content.task &&
                    handleEditTask(taskValue, false, content?.id);
                }}
                multiline
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    e.preventDefault();
                    handleEditTask(taskValue, false, content?.id);
                  }
                }}
              ></InputBase>
              <MarkAsImporantAction
                isStarred={content?.isStarred}
                task={content}
              />
            </Paper>

            <Paper
              elevation={"elevation"}
              component={"div"}
              sx={{
                position: "fixed",
                height: "66px",
                top: "1rem",
                boxShadow: "none",
                bgcolor:
                  useTheme().palette.mode == "light"
                    ? "#FAF8F9"
                    : useTheme().palette.background.default,
                zIndex: 100,
                width: "100%",
              }}
            ></Paper>
            <Paper
              variant="elevation"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                bgcolor: useTheme().palette.mode == "light" && "white",
                fontFamily: "Roboto",
                padding: "1rem 12px",
                border: "none",
                borderRadius: "5px",
                boxShadow: "none",
              }}
            >
              <TodayOutlinedIcon />
              <Typography>Add to My Day</Typography>
            </Paper>
            <Paper
              sx={{
                border: "none",
                boxShadow: "none",
                padding: "3px 12px",
                borderRadius: "5px",
              }}
            >
              <Typography variant="subtitle2">Add Note</Typography>
              <Divider sx={{ opacity: "0.5", mt: "3px" }} />
              <InputBase
                type="text"
                name="Note"
                value={value}
                onBlur={(e) => {
                  value != content.notes &&
                    handleEditTask(value, true, content?.id);
                }}
                autoFocus="autofocus"
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(
                    e.currentTarget.value.length,
                    e.currentTarget.value.length
                  )
                }
                onChange={(e) => setValue(e.target.value)}
                multiline
                fullWidth
                sx={{
                  padding: "6px 0rem",
                  border: "none",
                  outline: "none",
                  width: "100%",
                }}
                // variant="outlined"
              ></InputBase>
            </Paper>
          </CardContent>
        </Paper>
      </Card>
      <Box
        sx={{
          // padding: "1rem",
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "50px",
          left: 0,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            borderRadius: "0px !important",
            justifyContent: "space-around",
            alignItems: "center",
            bgcolor: useTheme().palette.mode == "dark" ? "#000" : "#FAF8F9",
          }}
        >
          <IconButton disableRipple onClick={onClose}>
            <CgPushChevronRightR />
          </IconButton>
          <Typography variant="subtite2" fontSize={"12px"}>{`${
            content?.isDone ? "Completed on " : "Created on "
          } ${day + " " + month + " " + date.getDate()}`}</Typography>
          <IconButton
            onClick={() => {
              setIsDeleteDialogOpen(true);
              // handleDeleteTask(content?.id);
            }}
            variant="outlined"
            disableRipple
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
  return (
    <>
      <Drawer
        variant="permanent"
        open={isOpen}
        anchor="right"
        sx={{
          width: "25%",
          flexShrink: 0,
          height: "100%",

          display: { xs: "none", md: "block" },
          [`& .MuiDrawer-paper`]: {
            width: "25%",
            minWidth: "25%",
          },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: "60px" } }} />
        {todoView}
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        sx={{
          minWidth: "50%",
          flexShrink: 0,

          height: "100%",
          display: { md: "none" },
          [`& .MuiDrawer-paper`]: {
            minWidth: "50%",

            width: { xs: "100%", sm: "50%" },
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar sx={{ minHeight: { xs: "60px" } }} />
        {todoView}
      </Drawer>
      <TodoDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        handleDeleteTask={() => handleDeleteTask(content?.id)}
      />
    </>
  );
};

export default TodoView;
