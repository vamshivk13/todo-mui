import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Card from "../components/ui/todo/TodoCard";
import Sidebar from "../components/ui/sidebar/Sidebar";
import TodoView from "../components/ui/todo/TodoView";
import NewTodoTextField from "../components/ui/todo/NewTodoTextField";
import useLocalStorage from "../hooks/useLocalStorage";
import MenuIcon from "@mui/icons-material/Menu";
import {
  IconButton,
  Input,
  InputBase,
  OutlinedInput,
  Paper,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const TodoPage = ({ setMode, mode }) => {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTempSidebarOpen, setIsTempSidebarOpen] = useState(false);
  const [isTempTodoViewOpen, setIsTempTodoViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [currentSidebarItemId, setCurrentSidebarItemId] = useState("MyDay");
  const [sidebarItemInputExpanded, setSidebarItemInputExpanded] =
    useState(false);
  const [updatedCurrentSidebarItem, setUpdatedCurrentSidebarItem] =
    useState("");
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
  const currentSideBarItem = ["MyDay", "Important", "MyTasks"].includes(
    currentSidebarItemId
  )
    ? sidebarItems.find((item) => item.id == currentSidebarItemId)
    : customSidebarItems.find((item) => item.id == currentSidebarItemId);

  useEffect(() => {
    setIsOpen(false);
  }, [currentSidebarItemId]);

  useEffect(() => {
    if (currentSideBarItem != undefined)
      setUpdatedCurrentSidebarItem(currentSideBarItem.name);
  }, [currentSideBarItem]);

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

  function switchToTextField(e) {
    e.stopPropagation();

    if (["MyDay", "Important", "MyTasks"].includes(currentSidebarItemId)) {
      return;
    }
    setSidebarItemInputExpanded((prev) => !prev);
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
  function updateSidebarItemName() {
    if (["MyDay", "Important", "MyTasks"].includes(currentSidebarItemId)) {
      return;
    } else {
      setCustomSidebarItems((customSidebarItems) =>
        customSidebarItems.map((item) => {
          if (item.id == currentSidebarItemId) {
            return {
              ...item,
              name: updatedCurrentSidebarItem,
            };
          } else {
            return item;
          }
        })
      );
    }
  }

  function handleDeleteSidebarItem(id) {
    let prevId = "MyDay";
    customSidebarItems.forEach((item) => {
      if (item.id == id) {
        return;
      }
      prevId = item.id;
    });
    setCurrentSidebarItemId(prevId);
    setCustomSidebarItems((prev) => prev.filter((item) => item.id != id));
    setTasks((prevTasks) =>
      prevTasks.filter((task) => {
        task.listTypeId != id;
      })
    );
  }

  console.log(currentSidebarItemId);
  return (
    <Box
      component={"div"}
      sx={{
        overflow: "auto",
        height: "100%",
        width: 1,
        display: "flex",
      }}
    >
      <Header setMode={setMode} mode={mode} />
      <Box
        component={"div"}
        sx={{
          marginTop: "60px",
          padding: 0,
          display: "flex",
          width: "100%",
          height: "calc(100% - 60px)",
        }}
      >
        <Sidebar
          setCurrentSidebarItemId={setCurrentSidebarItemId}
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          currentSidebarItemId={currentSidebarItemId}
          sidebarItems={sidebarItems}
          setCustomSidebarItems={setCustomSidebarItems}
          customSidebarItems={customSidebarItems}
          setTasks={setTasks}
          tasks={tasks}
          handleDeleteSidebarItem={handleDeleteSidebarItem}
          setIsTempSidebarOpen={setIsTempSidebarOpen}
          isTempSidebarOpen={isTempSidebarOpen}
        />
        <Box
          component={"div"}
          display={{
            flex: 1,
            width: "80%",
            flexShrink: 0,
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
              setSidebarItemInputExpanded(false);
              updateSidebarItemName();
            }}
          >
            <Box sx={{ px: "1rem", pt: 2 }}>
              <Box
                component={"form"}
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSidebarItemName();
                  setSidebarItemInputExpanded(false);
                }}
                sx={{ display: "flex", alignItems: "center", gap: "7px" }}
              >
                {(!isSidebarOpen || !isTempSidebarOpen) && (
                  <IconButton
                    onClick={() => {
                      setIsSidebarOpen((prev) => !prev);
                      setIsTempSidebarOpen((prev) => !prev);
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
                {sidebarItemInputExpanded == false ? (
                  <Typography
                    component={"div"}
                    variant="body1"
                    sx={{
                      fontWeight: "500",
                      fontSize: "1.3rem",
                      boxSizing: "border-box",
                    }}
                    onClick={switchToTextField}
                  >
                    {currentSideBarItem?.name}
                  </Typography>
                ) : (
                  <InputBase
                    sx={{
                      border: "0.2px solid",
                      borderRadius: "6px",
                      paddingX: "4px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    value={updatedCurrentSidebarItem}
                    autoFocus={true}
                    onFocus={(e) => {
                      e.target.style.width =
                        updatedCurrentSidebarItem.length + "ch";
                    }}
                    onChange={(e) => {
                      e.target.style.width = e.target.value.length + "ch";
                      setUpdatedCurrentSidebarItem(e.target.value);
                    }}
                  ></InputBase>
                )}
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </Box>
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
        </Box>
        {isOpen && (
          <TodoView
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClose={onClose}
            content={selectedTask}
            title={"Todo Details"}
            handleDeleteTask={handleDeleteTask}
            handleMarkAsDone={handleMarkAsDone}
            handleEditTask={handleEditTask}
          />
        )}
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
