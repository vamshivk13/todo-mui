import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  Hidden,
  Paper,
} from "@mui/material";
import Modal from "../components/Modal";

const TodoPage = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const selectedTask = tasks.find((task) => task.id == selectedId);
  function addTask(e) {
    e.preventDefault();
    setTasks((tasks) => [
      ...tasks,
      { task: value, isDone: false, id: Math.random() * 10 },
    ]);
    setValue("");
  }
  function onClose() {
    setIsOpen(false);
  }
  function handleSelectedTask(id) {
    setIsOpen(true);
    setSelectedId(id);
  }

  function handleDeleteTask() {
    setTasks((tasks) => tasks.filter((task) => task.id !== selectedId));
    setIsOpen(false);
  }
  function handleMarkAsDone() {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id == selectedId) {
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
        overflow: "scroll",
        height: "100%",
      }}
    >
      <Header />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        content={selectedTask}
        title={"Todo Details"}
        handleDeleteTask={handleDeleteTask}
        handleMarkAsDone={handleMarkAsDone}
        handleEditTask={handleEditTask}
      />
      <Container maxWidth="md" sx={{ marginTop: "100px" }}>
        <Box>
          <Box
            component={"form"}
            sx={{
              display: "flex",
              flexDirection: "row",
              px: "1rem",
              gap: "1rem",
            }}
            onSubmit={addTask}
          >
            <TextField
              id="todo"
              label="Note your Todo.."
              size="medium"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ flex: 1, borderWidth: "2px" }}
            />
            <Button
              variant="outlined"
              sx={{
                paddingX: 5,
                fontSize: "14px",
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                },
              }}
              type="submit"
            >
              Add
            </Button>
          </Box>
        </Box>
        {/* <Container> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            pt: 3,
            px: "1rem",
            marginBottom: "10px",
          }}
        >
          {tasks
            .filter((task) => task.isDone == false)
            .map((task) => {
              return (
                <Paper elevation={1}>
                  <Card
                    key={task.id}
                    onClick={() => handleSelectedTask(task.id)}
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  >
                    {/* <CardHeader title="title" /> */}
                    <CardContent
                      sx={{
                        overflow: "hidden",
                        padding: "13px !important",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" noWrap>
                        {task.task}
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              );
            })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
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
                // backdropFilter: "blur(10px)",
                color: "#4666FF",

                marginRight: "auto",
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
                <Paper elevation={2}>
                  <Card
                    key={task.id}
                    onClick={() => handleSelectedTask(task.id)}
                    sx={{
                      fontSize: "1.2rem",
                    }}
                  >
                    <CardContent sx={{ wordBreak: "break-all" }}>
                      {task.task}
                    </CardContent>
                  </Card>
                </Paper>
              );
            })}
        </Box>
        {/* </Container> */}
      </Container>
    </Box>
  );
};

export default TodoPage;
