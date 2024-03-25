import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Card from "../components/ui/todo/TodoCard";
import Sidebar from "../components/ui/sidebar/Sidebar";
import TodoView from "../components/ui/todo/TodoView";
import NewTodoTextField from "../components/ui/todo/NewTodoTextField";
import useLocalStorage from "../hooks/useLocalStorage";
import { Paper } from "@mui/material";

const TodoPage = ({ setMode, mode }) => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [currentSidebarItemId, setCurrentSidebarItemId] = useState("MyDay");
  const [sidebarItems, setSidebarItems] = useLocalStorage("sidebarItems", [
    {
      id: "MyDay",
      name: "My Day",
      count: 0,
    },
    {
      id: "Important",
      name: "Important",
      count: 0,
    },
    {
      id: "MyTasks",
      name: "My Tasks",
      count: 0,
    },
  ]);
  const [customSidebarItems, setCustomSidebarItems] = useLocalStorage(
    "customSideBarItems",
    []
  );
  const selectedTask = tasks.find((task) => task.id == selectedId);
  useEffect(() => {
    const currentTasks = tasks.filter(
      (task) => task.listTypeId === currentSidebarItemId
    );
    setCurrentTasks(currentTasks);
  }, [currentSidebarItemId, tasks]);
  function addTask(e) {
    e.preventDefault();
    if (value == "" || value == null || value == undefined) {
      return;
    }
    setTasks((tasks) => [
      ...tasks,
      {
        task: value,
        isDone: false,
        id: Math.random() * 10,
        notes: "",
        createdAt: new Date(),
        listTypeId: currentSidebarItemId,
      },
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

  function handleMarkAsDone(id) {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id == id) {
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
        <Sidebar
          setCurrentSidebarItemId={setCurrentSidebarItemId}
          currentSidebarItemId={currentSidebarItemId}
          sidebarItems={sidebarItems}
          setCustomSidebarItems={setCustomSidebarItems}
          customSidebarItems={customSidebarItems}
          tasks={tasks}
        />
        <Box
          component={"div"}
          display={{
            flex: 1,
            display: "flex",
          }}
        >
          <Box
            sx={{
              flex: 1,
              flexShrink: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
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
                gap: "7px",
                px: "1rem",
                marginBottom: "10px",
              }}
            >
              {currentTasks
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
                gap: "7px",
                marginBottom: "10px",
                px: "1rem",
              }}
            >
              {currentTasks.filter((task) => task.isDone == true).length >
                0 && (
                <Paper
                  sx={{
                    marginRight: "auto",
                    mt: 2,
                    mb: 1,
                    padding: "3px 10px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
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
