import React, { useEffect, useState } from "react";
import Card from "../todo/TodoCard";
import { Box, Paper, Typography } from "@mui/material";
import useLocalStorage from "../../../hooks/useLocalStorage";
const TodoList = ({
  currentSidebarItemId,
  handleMarkAsDone,
  handleSelectedTask,
}) => {
  const [tasks] = useLocalStorage("tasks");
  const [currentTasks, setCurrentTasks] = useState([]);
  useEffect(() => {
    const currentTasks = tasks.filter(
      (task) => task.listTypeId === currentSidebarItemId
    );
    setCurrentTasks(currentTasks);
  }, [currentSidebarItemId, tasks]);

  return (
    <Box sx={{ overflowY: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          px: "1rem",
          marginBottom: "10px",
        }}
      >
        {currentTasks
          .filter((task) => task.isDone == false)
          .sort((taska, taskb) => taskb.createdAt - taska.createdAt)
          .map((task) => {
            return (
              <Card
                key={task.id}
                task={task}
                handleSelectedTask={handleSelectedTask}
                handleMarkAsDone={handleMarkAsDone}
              />
            );
          })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          marginBottom: "10px",
          px: "1rem",
        }}
      >
        {currentTasks.filter((task) => task.isDone == true).length > 0 && (
          <Paper
            sx={{
              marginRight: "auto",
              mt: 2,
              mb: 1,
              padding: "3px 10px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                borderRadius: "5px",
              }}
            >
              Completed
            </Typography>
          </Paper>
        )}
        {currentTasks
          .filter((task) => task.isDone == true)
          .sort((taska, taskb) => taskb.doneAt - taska.doneAt)
          .map((task) => {
            return (
              <Card
                key={task.id}
                task={task}
                handleMarkAsDone={handleMarkAsDone}
                handleSelectedTask={handleSelectedTask}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default TodoList;
