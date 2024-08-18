import React, { useContext, useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Sidebar from "../components/ui/sidebar/Sidebar";
import TodoView from "../components/ui/todo/TodoView";
import NewTodoTextField from "../components/ui/todo/NewTodoTextField";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { InputBase, LinearProgress, Paper } from "@mui/material";
import { authContext } from "../store/AuthProvider";
import { useNavigate } from "react-router";
import useFetch from "../hooks/useFetch";
import { ThemeProvider, createTheme } from "@mui/material";
import MoreMenu from "../components/ui/todo/MoreMenu";
import { themeContext } from "../store/ColorThemeProvider";
import { colorThemeObject } from "../util/getThemeColors";
import { sidebarItems as defaultSidebarItems } from "../util/getSidebarItems";
import { useTheme } from "@emotion/react";
import SyncAnimation from "../components/animation/SyncAnimation";
import doneTone from "/doneTone.wav";
import SettingsDrawer from "../components/ui/drawer/settings/SettingsDrawer";
import { appStateContext } from "../store/ApplicationStateProvider";
import SidebarIcon from "../components/ui/header/todo/SidebarIcon";
import TodoList from "../components/ui/todo/todolist/TodoList";
import { appDataContext } from "../store/AppDataProvider";

const TodoPage = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [currentColor] = useContext(themeContext);
  const [sidebarItemInputExpanded, setSidebarItemInputExpanded] =
    useState(false);
  const [updatedCurrentSidebarItem, setUpdatedCurrentSidebarItem] =
    useState("");

  const {
    customSidebarItems,
    setCustomSidebarItems,
    tasks,
    setTasks,
    sidebarItems,
    setSidebarItems,
    currentSidebarItemId,
    setCurrentSidebarItemId,
  } = useContext(appDataContext);

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

  const [{ name }, setTasksAPI, isPostSyncing, isPostSuccess] = useFetch(
    "POST",
    "/tasks.json"
  );
  const [status, setStatus] = useState(null);
  const [tasksAPI, fetchTasks] = useFetch("GET", "/tasks.json");
  const [, deleteTask, isDeleteSyncing, isDeleteSuccess] = useFetch(
    "DELETE",
    "/tasks/"
  );
  const [, updateTask, isUpdateSyncing, isUpdateSuccess] = useFetch(
    "UPDATE",
    "/tasks/"
  );
  const [, updateList] = useFetch("UPDATE", "/lists/");
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

  // task completion sound
  const doneToneRef = useRef(new Audio(doneTone));
  const { settingsState } = useContext(appStateContext);

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

  // Update Selected Task
  useEffect(() => {
    if (selectedTask) {
      const curSelectedTask = tasks.find((task) => task.id == selectedId);
      setSelectedTask(curSelectedTask);
    }
  }, [tasks, selectedTask]);

  function updateTasksBasedOnDate() {
    tasks.forEach((task) => {
      const createdDate = new Date(task.createdAt).toDateString();
      if (createdDate != date.toDateString() && task.listTypeId == "MyDay") {
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
        if (createdDate != date.toDateString() && task.listTypeId == "MyDay") {
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
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated]);

  useEffect(() => {
    if (isDeleteSyncing || isPostSyncing || isUpdateSyncing) {
      setStatus("syncing");
    } else {
      setStatus(null);
    }
  }, [isDeleteSyncing, isPostSyncing, isUpdateSyncing]);

  useEffect(() => {
    if (isPostSuccess || isUpdateSuccess || isDeleteSuccess)
      setStatus("success");
    else {
      setStatus(null);
    }
  }, [isPostSuccess, isUpdateSuccess, isDeleteSuccess]);

  async function addTask(e) {
    e.preventDefault();
    e.stopPropagation();
    if (value == "" || value == null || value == undefined) {
      return;
    }

    const taskId = uuidv4();
    const listTypeId =
      currentSidebarItemId == "Important" ? "MyTasks" : currentSidebarItemId;
    setTasks((tasks) => {
      return [
        ...tasks,
        {
          task: value,
          isDone: false,
          notes: "",
          createdAt: Date.now(),
          doneAt: null,
          isStarred: false,
          listTypeId: listTypeId,
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
      isStarred: false,
      id: taskId,
      listTypeId: listTypeId,
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

    if (!curTask.isDone && settingsState.isSoundEnabled) {
      doneToneRef.current.pause();
      doneToneRef.current.currentTime = 0;
      doneToneRef.current.play();
    }

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
    // setIsOpen(false);
  }

  function switchToTextField(e) {
    e.stopPropagation();

    if (["MyDay", "Important", "MyTasks"].includes(currentSidebarItemId)) {
      return;
    }
    setSidebarItemInputExpanded((prev) => !prev);
  }

  function handleEditTask(val, isNote, id) {
    const curTask = tasks.find((task) => task.id == id);
    const toUpdate = isNote ? { notes: val } : { task: val };

    updateTask({
      route: curTask.key + ".json",
      data: {
        ...curTask,
        ...toUpdate,
      },
    });
    setTasks((tasks) => {
      return tasks.map((task) => {
        if (task.id == id) {
          return {
            ...task,
            ...toUpdate,
          };
        } else return task;
      });
    });
    // setIsOpen(false);
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
      const curList = customSidebarItems.find(
        (item) => item.id == currentSidebarItemId
      );
      updateList({
        route: curList.key + ".json",
        data: {
          ...curList,
          name: updatedCurrentSidebarItem,
        },
      });
    }
  }

  function handleDeleteSidebarItem(id) {
    if (
      defaultSidebarItems.findIndex(
        (item) => item.id == currentSidebarItemId
      ) >= 0
    ) {
      return;
    }

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
        return task.listTypeId != id;
      })
    );
  }

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
          currentSidebarItemId={currentSidebarItemId}
          sidebarItems={sidebarItems}
          setCustomSidebarItems={setCustomSidebarItems}
          customSidebarItems={customSidebarItems}
          tasks={tasks}
          handleDeleteSidebarItem={handleDeleteSidebarItem}
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
                  <SidebarIcon currentSidebarItemId={currentSidebarItemId} />
                  {sidebarItemInputExpanded == false ? (
                    <Box>
                      <Typography
                        component={"div"}
                        variant="body1"
                        sx={{
                          fontWeight: "800",
                          fontFamily: "Roboto",
                          fontSize: "1.3rem",
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
                        border: "none",
                        borderRadius: "6px",
                        paddingX: "4px",
                        fontSize: "1.3rem",
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
                    handleDeleteSidebarItem={handleDeleteSidebarItem}
                  />

                  <Box sx={{ ml: "auto", marginRight: "1rem" }}>
                    <SyncAnimation status={status} setStatus={setStatus} />
                  </Box>
                </Box>
              </Box>
              <NewTodoTextField
                value={value}
                setValue={setValue}
                addTask={addTask}
                currentSidebarItemId={currentSidebarItemId}
              />
              <TodoList
                currentSidebarItemId={currentSidebarItemId}
                handleMarkAsDone={handleMarkAsDone}
                handleSelectedTask={handleSelectedTask}
                tasks={tasks}
              />
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
          <SettingsDrawer />
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default TodoPage;
