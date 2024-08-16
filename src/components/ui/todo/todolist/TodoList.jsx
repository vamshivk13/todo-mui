import React, { useEffect, useState } from "react";
import Card from "../TodoCard";
import { Box } from "@mui/material";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import CompletedHeader from "./CompletedHeader";
import { getCompletedTasks, getTodoTasks } from "../../../../util/getTasks";
const TodoList = ({
  currentSidebarItemId,
  handleMarkAsDone,
  handleSelectedTask,
}) => {
  const [tasks] = useLocalStorage("tasks");
  const [currentTasks, setCurrentTasks] = useState([]);
  const isDonePresent =
    currentTasks.filter((task) => task.isDone == true).length > 0;
  const completedTasks = getCompletedTasks(currentTasks);
  const toDoTasks = getTodoTasks(currentTasks);

  const WrapperBox = ({ children }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          px: "1rem",
          marginBottom: "10px",
        }}
      >
        {children}
      </Box>
    );
  };

  useEffect(() => {
    const currentTasks = tasks.filter(
      (task) => task.listTypeId === currentSidebarItemId
    );
    setCurrentTasks(currentTasks);
  }, [currentSidebarItemId, tasks]);

  return (
    <Box sx={{ overflowY: "auto" }}>
      <WrapperBox>
        {toDoTasks.map((task) => {
          return (
            <Card
              key={task.id}
              task={task}
              handleSelectedTask={handleSelectedTask}
              handleMarkAsDone={handleMarkAsDone}
            />
          );
        })}
      </WrapperBox>
      <WrapperBox>
        {isDonePresent && <CompletedHeader count={completedTasks.length} />}
        {completedTasks.map((task) => {
          return (
            <Card
              key={task.id}
              task={task}
              handleMarkAsDone={handleMarkAsDone}
              handleSelectedTask={handleSelectedTask}
            />
          );
        })}
      </WrapperBox>
    </Box>
  );
};

export default TodoList;