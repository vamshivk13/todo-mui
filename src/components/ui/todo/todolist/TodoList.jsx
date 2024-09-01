import React, { useEffect, useState } from "react";
import Card from "../TodoCard";
import { Box, Collapse } from "@mui/material";
import CompletedHeader from "./CompletedHeader";
import "./test.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { todoReducerActions } from "../../../../store/store";
const TodoList = ({
  currentSidebarItemId,
  handleMarkAsDone,
  handleSelectedTask,
  customSidebarItems,
}) => {
  const toDoTasks = useSelector((state) => state.todo.todos);
  const completedTasks = useSelector((state) => state.todo.completed);

  const isDonePresent = completedTasks.length > 0;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(todoReducerActions.setTodos(currentSidebarItemId));
    dispatch(todoReducerActions.setCompleted(currentSidebarItemId));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(todoReducerActions.resetTodos());
    };
  }, []);

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
              <Collapse key={task.id} timeout={200} classNames="todo">
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
              <Collapse key={task.id} timeout={200} classNames="todo">
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
