import React, { useContext, useState } from "react";
import { Paper, Card, CardContent, Typography } from "@mui/material";

import { useTheme } from "@emotion/react";
import TodoMenu from "./todomenu/TodoMenu";
import { appDataContext } from "../../../store/AppDataProvider";
import useFetch from "../../../hooks/useFetch";

import MarkAsDoneAction from "./todoactions/MarkAsDoneAction";
import MarkAsImportantAction from "./todoactions/MarkAsImportantAction";
const TodoCard = ({ task, handleSelectedTask, handleMarkAsDone }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const { setTasks } = useContext(appDataContext);
  const [, updateTask, isUpdateSyncing, isUpdateSuccess] = useFetch(
    "UPDATE",
    "/tasks/"
  );

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

  function handleMarkAsImportant(e) {
    e.preventDefault();
    e.stopPropagation();
    setTasks((prev) => {
      return prev.map((curTask) => {
        if (curTask.id == task.id) {
          return {
            ...curTask,
            isStarred: curTask?.isStarred ? !curTask.isStarred : true,
          };
        } else {
          return curTask;
        }
      });
    });
    // update the curTask to the firebase
    updateTask({
      route: task.key + ".json",
      data: {
        ...task,
        isStarred: task?.isStarred ? !task.isStarred : true,
      },
    });
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
          <MarkAsDoneAction
            isDone={task?.isDone}
            handleMarkAsDone={() => {
              handleMarkAsDone(task?.id);
            }}
          />
          <Typography
            variant="body1"
            sx={{
              wordBreak: "break-all",
              color: useTheme().typography.custom.main,
            }}
          >
            {task?.task}
          </Typography>
          <MarkAsImportantAction
            isStarred={task?.isStarred}
            handleMarkAsImportant={handleMarkAsImportant}
          />
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
