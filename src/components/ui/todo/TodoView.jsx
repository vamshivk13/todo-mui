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
  const [customSideBarItems] = useLocalStorage("customSideBarItems");
  const [sidebarItems] = useLocalStorage("sidebarItems");
  const { screenWidth } = useContext(appStateContext);

  useEffect(() => {
    if (content) setValue(content?.task);
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
          sx={{
            overflowY: "auto",
            // scrollbarWidth: "thin",
            height: "100%",
            borderRadius: "0 !important",
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
          <CardHeader
            title="Todo Details"
            sx={{ color: useTheme().typography.body1.color }}
          ></CardHeader>
          <CardContent sx={{ py: "1rem", flex: 1 }}>
            <InputBase
              type="text"
              value={value}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleEditTask(value, content?.id);
                }
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
              }}
              // variant="outlined"
            ></InputBase>
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
        open={true}
        anchor="right"
        sx={{
          width: "20%",
          // flex: "0.25",
          flexShrink: 0,
          height: "100%",
          display: { xs: "none", md: "block" },
          [`& .MuiDrawer-paper`]: {
            width: "20%",
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
