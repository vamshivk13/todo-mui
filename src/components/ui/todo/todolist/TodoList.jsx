import React, { useEffect, useState } from "react";
import Card from "../TodoCard";
import { Box, Collapse, List, ListItem } from "@mui/material";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import CompletedHeader from "./CompletedHeader";
import { getCompletedTasks, getTodoTasks } from "../../../../util/getTasks";
import { TransitionGroup } from "react-transition-group";
const TodoList = ({
  currentSidebarItemId,
  handleMarkAsDone,
  handleSelectedTask,
  tasks,
  customSidebarItems,
}) => {
  const [currentTasks, setCurrentTasks] = useState([]);
  const isDonePresent =
    currentTasks.filter((task) => task?.isDone == true).length > 0;
  const completedTasks = getCompletedTasks(currentTasks);
  const toDoTasks = getTodoTasks(currentTasks);

  useEffect(() => {
    let currentTasks = [];
    if (currentSidebarItemId == "Important") {
      currentTasks = tasks.filter((task) => task.isStarred == true);
    } else
      currentTasks = tasks.filter(
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
        <TransitionGroup component={null}>
          {toDoTasks.map((task) => {
            return (
              <Collapse key={task.id}>
                <Card
                  task={task}
                  handleSelectedTask={handleSelectedTask}
                  handleMarkAsDone={handleMarkAsDone}
                  customSidebarItems={customSidebarItems}
                />
              </Collapse>
            );
          })}
        </TransitionGroup>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          px: "1rem",
          marginBottom: "10px",
        }}
      >
        {isDonePresent && <CompletedHeader count={completedTasks.length} />}
        <TransitionGroup component={null}>
          {completedTasks.map((task) => {
            return (
              <Collapse key={task.id}>
                <Card
                  task={task}
                  handleMarkAsDone={handleMarkAsDone}
                  handleSelectedTask={handleSelectedTask}
                  customSidebarItems={customSidebarItems}
                />
              </Collapse>
            );
          })}
        </TransitionGroup>
      </Box>
    </Box>
  );
};

export default TodoList;
