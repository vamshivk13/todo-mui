import React, { useState } from "react";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Menu,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@emotion/react";
import TodoMenu from "./todomenu/TodoMenu";
const TodoCard = ({ task, handleSelectedTask, handleMarkAsDone }) => {
  const [showHoverEffect, setShowHoverEffect] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);

  function handleContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : null
    );
  }
  return (
    <Paper
      elevation={0}
      onClick={(e) => {
        if (contextMenu) {
          return;
        }
        e.stopPropagation();
        handleSelectedTask(task?.id);
      }}
      onContextMenu={handleContextMenu}
    >
      <Card
        sx={{
          fontSize: "1.2rem",
          boxShadow:
            "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent
          sx={{
            overflow: "hidden",
            padding: "13px !important",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {task?.isDone ? (
            <IconButton
              sx={{ padding: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsDone(task.id);
              }}
              disableRipple
            >
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{ padding: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsDone(task.id);
              }}
              disableRipple
              onMouseOver={() => setShowHoverEffect(true)}
              onMouseLeave={() => setShowHoverEffect(false)}
            >
              {showHoverEffect ? (
                <CheckCircleOutlineIcon />
              ) : (
                <RadioButtonUncheckedIcon
                  sx={{
                    opacity: "0.5",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                />
              )}
            </IconButton>
          )}
          <Typography
            variant="body1"
            sx={{
              wordBreak: "break-all",
              color: useTheme().typography.custom.main,
            }}
          >
            {task?.task}
          </Typography>
        </CardContent>
      </Card>
      <TodoMenu
        task={task}
        isOpen={contextMenu !== null}
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        setContextMenu={setContextMenu}
      />
    </Paper>
  );
};

export default TodoCard;
