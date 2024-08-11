import React, { useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import Card from "../components/ui/todo/TodoCard";
import Sidebar from "../components/ui/sidebar/Sidebar";
import TodoView from "../components/ui/todo/TodoView";
import NewTodoTextField from "../components/ui/todo/NewTodoTextField";
import useLocalStorage from "../hooks/useLocalStorage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import { v4 as uuidv4 } from "uuid";
import { IconButton, InputBase, LinearProgress, Paper } from "@mui/material";
import { authContext } from "../store/AuthProvider";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import ListIcon from "../util/ListIcon";
import { ThemeProvider, createTheme } from "@mui/material";
import MoreMenu from "../components/ui/todo/MoreMenu";
import { themeContext } from "../store/ColorThemeProvider";
import { colorThemeObject } from "../util/getThemeColors";
import { sidebarItems as defaultSidebarItems } from "../util/getSidebarItems";
import { useTheme } from "@emotion/react";
const TodoPage = () => {
  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTempSidebarOpen, setIsTempSidebarOpen] = useState(true);
  const [isTempTodoViewOpen, setIsTempTodoViewOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [currentSidebarItemId, setCurrentSidebarItemId] = useState("MyDay");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentColor, setCurrentColor] = useContext(themeContext);
  const [sidebarItemInputExpanded, setSidebarItemInputExpanded] =
    useState(false);
  const [updatedCurrentSidebarItem, setUpdatedCurrentSidebarItem] =
    useState("");

  const [sidebarItems, setSidebarItems] = useLocalStorage(
    "sidebarItems",
    defaultSidebarItems
  );
  const [customSidebarItems, setCustomSidebarItems] = useLocalStorage(
    "customSideBarItems",
    []
  );
  const [selectedTask, setSelectedTask] = useState(null);

  const date = new Date();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { weekday: "long" });

  const { user, setUser } = useContext(authContext);
  const navigate = useNavigate();

  const currentSideBarItem = ["MyDay", "Important", "MyTasks"].includes(
    currentSidebarItemId
  )
    ? sidebarItems.find((item) => item.id == currentSidebarItemId)
    : customSidebarItems.find((item) => item.id == currentSidebarItemId);

  const [{ name }, setTasksAPI] = useFetch("POST", "/tasks.json");
  const [tasksAPI, fetchTasks] = useFetch("GET", "/tasks.json");
  const [, deleteTask] = useFetch("DELETE", "/tasks/");
  const [, updateTask] = useFetch("UPDATE", "/tasks/");
  const [initialSidebarItems, fetchDefaultSidebarItems] = useFetch(
    "GET",
    "/default-lists.json"
  );
  const [customSidebarLists, fetchCustomSidebarLists] = useFetch(
    "GET",
    "/lists.json"
  );

  const [, deleteCustomList] = useFetch("DELETE", "/lists/");
  const [isTasksLoading, setIsTasksLoading] = useState(null);

  useEffect(() => {
    function getDefaultSidebarItems() {
      fetchDefaultSidebarItems(null);
    }
    getDefaultSidebarItems();
  }, []);
  useEffect(() => {
    const keys = Object.keys(initialSidebarItems || {});
    const initialItems = keys.map((key) => {
      return { ...initialSidebarItems[key], key };
    });
    const updatedSidebarItemsOnLoad = sidebarItems.map((item) => {
      const initialItemforId = initialItems.find(
        (iItem) => iItem.id == item.id
      );
      if (initialItemforId) {
        return {
          ...item,
          color: initialItemforId.color,
          key: initialItemforId.key,
        };
      } else {
        return item;
      }
    });
    setSidebarItems(() => updatedSidebarItemsOnLoad);
  }, [initialSidebarItems]);

  useEffect(() => {
    async function loadTasks() {
      await fetchTasks(null);
      setIsTasksLoading(false);
    }
    setIsTasksLoading(true);
    loadTasks();
  }, []);

  useEffect(() => {
    function loadCustomLists() {
      fetchCustomSidebarLists(null);
    }
    loadCustomLists();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth > 900) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function updateTasksBasedOnDate() {
    tasks.forEach((task) => {
      const createdDate = new Date(task.createdAt).toDateString();
      console.log("today", createdDate, date);
      if (createdDate != date.toDateString()) {
        updateTask({
          route: task.key + ".json",
          data: {
            ...task,
            listTypeId: "MyTasks",
          },
        });
      }
    });
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        const createdDate = new Date(task.createdAt).toDateString();
        if (createdDate != date.toDateString()) {
          return {
            ...task,
            listTypeId: "MyTasks",
          };
        } else return task;
      });
    });
  }
  useEffect(() => {
    const keys = Object.keys(tasksAPI || {});
    const initialTasks = keys.map((key) => {
      return { ...tasksAPI[key], key };
    });
    console.log("Loaded", initialTasks, keys);
    setTasks(() => initialTasks);
  }, [tasksAPI]);

  useEffect(() => {
    if (isTasksLoading == false) {
      updateTasksBasedOnDate();
    }
  }, [tasksAPI, isTasksLoading]);

  useEffect(() => {
    const keys = Object.keys(customSidebarLists || {});
    const initialLists = keys.map((key) => {
      return { ...customSidebarLists[key], key };
    });
    setCustomSidebarItems(initialLists);
  }, [customSidebarLists]);

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

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated]);

  async function addTask(e) {
    console.log("add task is called");
    e.preventDefault();
    e.stopPropagation();
    if (value == "" || value == null || value == undefined) {
      return;
    }

    const taskId = uuidv4();
    setTasks((tasks) => {
      return [
        ...tasks,
        {
          task: value,
          isDone: false,
          notes: "",
          createdAt: Date.now(),
          doneAt: null,
          listTypeId: currentSidebarItemId,
          id: taskId,
          key: null,
        },
      ];
    });
    setValue("");
    const data = await setTasksAPI({
      task: value,
      isDone: false,
      notes: "",
      createdAt: Date.now(),
      doneAt: null,
      id: taskId,
      listTypeId: currentSidebarItemId,
    });

    setTasks((prev) => {
      return prev.map((curTask) => {
        if (curTask.id == taskId) {
          return {
            ...curTask,
            key: data.name,
          };
        } else return curTask;
      });
    });
  }

  function onClose() {
    setIsOpen(false);
    setSelectedId(null);
  }
  function handleSelectedTask(id) {
    console.log("Selcted Id", id);
    setIsOpen(true);
    setSelectedId(id);
    const selectedTask = tasks.find((task) => task.id == id);
    setSelectedTask(selectedTask);
  }

  function handleDeleteTask(id) {
    const curTask = tasks.find((task) => task.id == id);
    deleteTask(curTask.key + ".json");
    setTasks((tasks) => tasks.filter((task) => task.id !== selectedId));

    setIsOpen(false);
  }

  function handleMarkAsDone(id) {
    const curTask = tasks.find((task) => task.id == id);

    updateTask({
      route: curTask.key + ".json",
      data: {
        ...curTask,
        isDone: !curTask.isDone,
        doneAt: Date.now(),
      },
    });

    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            isDone: !task.isDone,
            doneAt: Date.now(),
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

  function handleEditTask(val, id) {
    console.log("handle edit task is called", id, tasks);
    const curTask = tasks.find((task) => task.id == id);
    console.log("handle edit task is called", id, tasks, curTask);

    updateTask({
      route: curTask.key + ".json",
      data: {
        ...curTask,
        task: val,
      },
    });
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            task: val,
          };
        } else return task;
      });
    });
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
    const curCustomSideBarItem = customSidebarItems.find(
      (item) => item.id == id
    );
    let prevId = "MyDay";
    deleteCustomList(curCustomSideBarItem.key + ".json");
    customSidebarItems.forEach((item) => {
      if (item.id == id) {
        return;
      }
      prevId = item.id;
    });
    setCurrentSidebarItemId(prevId);
    setCustomSidebarItems((prev) => prev.filter((item) => item.id != id));
    tasks.forEach((curTask) => {
      if (curTask.listTypeId == id) deleteTask(curTask.key + ".json");
    });
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
      <Box
        component={"div"}
        sx={{
          marginTop: "60px",
          padding: 0,
          display: "flex",
          width: "100%",
          height: "calc(100% - 60px)",
          bgcolor: useTheme().palette.mode == "light" && "#FAF8F9",
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
        <ThemeProvider
          theme={(theme) => createTheme(colorThemeObject(theme, currentColor))}
        >
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
              }}
              onClick={() => {
                setIsOpen(false);
                setSidebarItemInputExpanded(false);
                updateSidebarItemName();
              }}
            >
              {isTasksLoading && <LinearProgress sx={{ height: "5px" }} />}
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
                  <IconButton
                    onClick={() => {
                      if (screenWidth < 900) {
                        setIsTempSidebarOpen((prev) => !prev);
                      } else {
                        setIsSidebarOpen((prev) => !prev);
                      }
                    }}
                  >
                    {isSidebarOpen ? (
                      <ListIcon itemIcon={currentSidebarItemId} />
                    ) : screenWidth < 600 ? (
                      <ArrowBackIcon />
                    ) : (
                      <MenuIcon />
                    )}
                  </IconButton>

                  {sidebarItemInputExpanded == false ? (
                    <Box>
                      <Typography
                        component={"div"}
                        variant="body1"
                        sx={{
                          fontWeight: "800",
                          fontSize: "1.3rem",
                          boxSizing: "border-box",
                        }}
                        onClick={switchToTextField}
                      >
                        {currentSideBarItem?.name}
                      </Typography>
                      {currentSidebarItemId == "MyDay" && (
                        <Typography
                          fontFamily={
                            ("Segoe", "Segoe UI", "Arial", "sans-serif")
                          }
                          fontWeight={100}
                          fontSize={"1.5ch"}
                        >
                          {day + " " + month + " " + date.getDate()}
                        </Typography>
                      )}
                    </Box>
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
                  <MoreMenu
                    setCustomSidebarItems={setCustomSidebarItems}
                    currentSidebarItemId={currentSidebarItemId}
                    customSidebarItems={customSidebarItems}
                    sidebarItems={sidebarItems}
                    setSidebarItems={setSidebarItems}
                  />
                </Box>
              </Box>
              <NewTodoTextField
                value={value}
                setValue={setValue}
                addTask={addTask}
              />
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
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default TodoPage;
