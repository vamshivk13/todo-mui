import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Card from "../components/ui/todo/TodoCard";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Button,
  CardContent,
  Card as CardMui,
  FilledInput,
  IconButton,
  Input,
  InputBase,
  OutlinedInput,
  Paper,
} from "@mui/material";
import Modal from "../components/Modal";
import Sidebar from "../components/ui/sidebar/Sidebar";
import TodoView from "../components/ui/todo/TodoView";
import NewTodoTextField from "../components/ui/todo/NewTodoTextField";

const TodoPage = ({ setMode, mode }) => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedTask = tasks.find((task) => task.id == selectedId);
  function addTask(e) {
    e.preventDefault();
    if (value == "" || value == null || value == undefined) {
      return;
    }
    setTasks((tasks) => [
      ...tasks,
      { task: value, isDone: false, id: Math.random() * 10 },
    ]);
    setValue("");
  }
  function onClose() {
    setIsOpen(false);
    setSelectedId(null);
  }
  function handleSelectedTask(id) {
    setIsOpen(true);
    setSelectedId(id);
  }

  function handleDeleteTask() {
    setTasks((tasks) => tasks.filter((task) => task.id !== selectedId));
    setIsOpen(false);
  }
  console.log(selectedId);
  function handleMarkAsDone(id = null) {
    const idToBeMarked =
      selectedId == null || selectedId == undefined ? id : selectedId;
    console.log("ID---", idToBeMarked);
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id == idToBeMarked) {
          return {
            ...task,
            isDone: !task.isDone,
          };
        } else return task;
      })
    );
    setIsOpen(false);
  }

  function handleEditTask(val) {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id == selectedId) {
          return {
            ...task,
            task: val,
          };
        } else return task;
      })
    );
    setIsOpen(false);
  }

  return (
    <Box
      component={"div"}
      sx={{
        overflow: "auto",
        height: "100%",
      }}
    >
      <Header setMode={setMode} mode={mode} />

      <Box
        component={"div"}
        sx={{
          marginTop: "60px",
          padding: 0,
          display: "flex",
          height: "calc(100% - 60px)",
        }}
      >
        <Sidebar />
        <Box display={{ flex: 1, display: "flex" }}>
          <Box
            sx={{
              flex: 1,
              flexShrink: 1,
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <NewTodoTextField
              value={value}
              setValue={setValue}
              addTask={addTask}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                pt: 3,
                px: "1rem",
                marginBottom: "10px",
              }}
            >
              {tasks
                .filter((task) => task.isDone == false)
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
                gap: "5px",
                pt: 3,
                marginBottom: "10px",
                px: "1rem",
              }}
            >
              {tasks.filter((task) => task.isDone == true).length > 0 && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: "13px",
                    bgcolor: "rgba(240,242,237,0.79)",
                    fontWeight: "600",
                    marginRight: "auto",
                    marginBottom: "5px",
                    padding: "3px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Completed
                </Typography>
              )}
              {tasks
                .filter((task) => task.isDone == true)
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
          {isOpen && (
            <TodoView
              isOpen={isOpen}
              onClose={onClose}
              content={selectedTask}
              title={"Todo Details"}
              handleDeleteTask={handleDeleteTask}
              handleMarkAsDone={handleMarkAsDone}
              handleEditTask={handleEditTask}
            />
          )}
        </Box>

        {/* <Modal
          isOpen={isOpen}
          onClose={onClose}
          content={selectedTask}
          title={"Todo Details"}
          handleDeleteTask={handleDeleteTask}
          handleMarkAsDone={handleMarkAsDone}
          handleEditTask={handleEditTask}
        /> */}
      </Box>
    </Box>
  );
};

export default TodoPage;
