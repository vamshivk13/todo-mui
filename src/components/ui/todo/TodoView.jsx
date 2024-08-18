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
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { appStateContext } from "../../../store/ApplicationStateProvider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";

const TodoView = ({
  isOpen,
  content,
  onClose,
  handleDeleteTask,
  handleMarkAsDone,
  handleEditTask,
  setIsOpen,
}) => {
  const [value, setValue] = useState(content?.task);
  const [taskValue, setTaskValue] = useState(content?.task);
  const [customSideBarItems] = useLocalStorage("customSideBarItems");
  const [sidebarItems] = useLocalStorage("sidebarItems");
  const { screenWidth } = useContext(appStateContext);

  useEffect(() => {
    if (content) setValue(content?.notes);
  }, [content?.notes]);

  useEffect(() => {
    if (content) setTaskValue(content?.task);
  }, [content?.task]);

  function getListName(id) {
    if (sidebarItems.find((item) => item.id == id)) {
      return sidebarItems.find((item) => item.id == id).name;
    } else {
      return customSideBarItems.find((item) => item.id == id).name;
    }
  }
  const todoView = (
    <Box
      sx={{
        height: "100%",
        flex: "1",
        position: "relative",
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
            // scrollbarWidth: "thin",
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
              sx={{ padding: "10px 9px" }}
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
            }}
          >
            <Paper
              variant="elevation"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                bgcolor: useTheme().palette.mode == "light" && "white",
                fontFamily: "Roboto",
                padding: "5px 12px",
                border: "none",
                borderRadius: "5px",
                boxShadow: "none",
              }}
            >
              <CheckCircleIcon fontSize="small" />
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
              <StarBorderTwoToneIcon
                sx={{
                  ml: "auto",
                  mr: "8px",
                }}
              />
            </Paper>
            <Paper
              sx={{
                border: "none",
                boxShadow: "none",
                padding: "3px 12px",
                borderRadius: "5px",
                boxShadow: "none",
              }}
            >
              <Typography variant="subtitle2">Add Note</Typography>
              <Divider sx={{ opacity: "0.5", mt: "3px" }} />
              <InputBase
                type="text"
                name="Note"
                value={value}
                onBlur={(e) => {
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
          <IconButton
            onClick={() => handleDeleteTask(content?.id)}
            variant="outlined"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => handleMarkAsDone(content?.id)}
            variant="outlined"
          >
            {content?.isDone ? <UndoIcon /> : <DoneIcon />}
          </IconButton>
          <IconButton
            type="submit"
            variant="outlined"
            onClick={() => handleEditTask(value, content?.id)}
          >
            <SaveIcon />
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
          // flex: "0.25",
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
    </>
  );
};

export default TodoView;
