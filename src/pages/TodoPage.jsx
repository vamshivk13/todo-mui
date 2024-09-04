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
import TodoDeleteDialog from "../components/ui/todo/todomenu/TodoDeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { todoReducerActions } from "../store/store";
import fetchAPI, { setBaseUrl } from "../hooks/fetchAPI";

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
    sidebarItems,
    setSidebarItems,
    currentSidebarItemId,
    setCurrentSidebarItemId,
  } = useContext(appDataContext);

  const tasks = useSelector((state) => state.todo.tasks);

  const [selectedTask, setSelectedTask] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const date = new Date();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { weekday: "long" });

  const { user } = useContext(authContext);
  const navigate = useNavigate();

  const currentSideBarItem = ["MyDay", "Important", "MyTasks"].includes(
    currentSidebarItemId
  )
    ? sidebarItems.find((item) => item.id == currentSidebarItemId)
    : customSidebarItems.find((item) => item.id == currentSidebarItemId);

  // const [status, setStatus] = useState(null);
  const [tasksAPI, setTasksAPI] = useState(null);
  const [initialSidebarItems, setInitialSidebarItems] = useState(null);
  const [customSidebarLists, setCustomSidebarLists] = useState(null);

  const [isTasksLoading, setIsTasksLoading] = useState(null);

  // task completion sound
  const doneToneRef = useRef(new Audio(doneTone));
  const { settingsState, width, setWidth, isSidebarOpen } =
    useContext(appStateContext);
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getDefaultSidebarItems() {
      const res = await fetchAPI("GET", "/default-lists.json", null);
      setInitialSidebarItems(res);
    }
    if (loaded) getDefaultSidebarItems();
  }, [loaded]);

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
    setIsTasksLoading(true);
    async function loadTasks() {
      const initialTasks = await fetchAPI("GET", "/tasks.json", null);
      setTasksAPI(initialTasks);
    }
    if (loaded) {
      loadTasks();
    }
  }, [loaded]);

  useEffect(() => {
    async function loadCustomLists() {
      const res = await fetchAPI("GET", "/lists.json", null);
      setCustomSidebarLists(res);
    }
    if (loaded) loadCustomLists();
  }, [loaded]);

  // Update Selected Task
  useEffect(() => {
    if (selectedTask) {
      const curSelectedTask = tasks.find((task) => task.id == selectedId);
      setSelectedTask(curSelectedTask);
    }
  }, [tasks, selectedTask]);

  function updateTasksBasedOnDate() {
    tasks?.forEach((task) => {
      const createdDate = new Date(task.createdAt).toDateString();
      if (createdDate != date.toDateString() && task.listTypeId == "MyDay") {
        fetchAPI("UPDATE", "/tasks/", {
          route: task.key + ".json",
          data: {
            ...task,
            listTypeId: "MyTasks",
          },
        });
      }
    });

    dispatch(todoReducerActions.updateTaskByDate());
  }
  useEffect(() => {
    const keys = Object.keys(tasksAPI || {});
    const initialTasks = keys.map((key) => {
      return { ...tasksAPI[key], key };
    });

    dispatch(todoReducerActions.setTasks(initialTasks));
    dispatch(todoReducerActions.setTodos("MyDay"));
    dispatch(todoReducerActions.setCompleted("MyDay"));
    setIsTasksLoading(false);
  }, [tasksAPI]);

  console.log("state: ", state);
  useEffect(() => {
    if (!isTasksLoading && tasksAPI) {
      console.log("REMOVING");
      updateTasksBasedOnDate();
    }
  }, [isTasksLoading, tasksAPI]);

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
    } else {
      setBaseUrl(user.userId);
      setLoaded(true);
    }
  }, [user.isAuthenticated]);

  async function addTask(value) {
    if (value == "" || value == null || value == undefined) {
      return;
    }

    const taskId = uuidv4();
    const listTypeId =
      currentSidebarItemId == "Important" ? "MyTasks" : currentSidebarItemId;
    const isStarred = currentSidebarItemId == "Important" ? true : false;

    dispatch(
      todoReducerActions.addTask({
        task: value,
        isDone: false,
        notes: "",
        createdAt: Date.now(),
        doneAt: null,
        isStarred: isStarred,
        listTypeId: listTypeId,
        id: taskId,
        key: null,
      })
    );
    dispatch(
      todoReducerActions.addTodo({
        task: value,
        isDone: false,
        notes: "",
        createdAt: Date.now(),
        doneAt: null,
        isStarred: isStarred,
        listTypeId: listTypeId,
        id: taskId,
        key: null,
      })
    );

    setValue("");
    const data = await fetchAPI("POST", "/tasks.json", {
      task: value,
      isDone: false,
      notes: "",
      createdAt: Date.now(),
      doneAt: null,
      isStarred: isStarred,
      id: taskId,
      listTypeId: listTypeId,
    });

    dispatch(
      todoReducerActions.updateTask({
        id: taskId,
        updatedTaskPayload: { key: data.name },
      })
    );
  }

  function onClose() {
    setWidth(0);
    setIsOpen(false);
    setSelectedId(null);
  }
  function handleSelectedTask(id) {
    setIsOpen(true);
    setWidth(300);
    setSelectedId(id);
    const selectedTask = tasks.find((task) => task.id == id);
    setSelectedTask(selectedTask);
  }

  function handleDeleteTask(id) {
    const curTask = tasks.find((task) => task.id == selectedId);
    fetchAPI("DELETE", "/tasks/", curTask.key + ".json");
    dispatch(todoReducerActions.deleteTask({ id: selectedId }));
    setIsOpen(false);
  }

  function handleMarkAsDone(id) {
    const curTask = tasks.find((task) => task.id == id);
    const date = Date.now();
    fetchAPI("UPDATE", "/tasks/", {
      route: curTask.key + ".json",
      data: {
        ...curTask,
        isDone: !curTask.isDone,
        doneAt: date,
      },
    });

    if (!curTask.isDone && settingsState.isSoundEnabled) {
      doneToneRef.current.pause();
      doneToneRef.current.currentTime = 0;
      doneToneRef.current.play();
    }
    dispatch(
      todoReducerActions.updateTask({
        id: id,
        updatedTaskPayload: { isDone: !curTask.isDone, doneAt: date },
      })
    );

    dispatch(
      todoReducerActions.deleteTodo({ id: id, isDone: curTask.isDone, date })
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

    fetchAPI("UPDATE", "/tasks/", {
      route: curTask.key + ".json",
      data: {
        ...curTask,
        ...toUpdate,
      },
    });

    dispatch(
      todoReducerActions.updateTask({
        id: id,
        updatedTaskPayload: toUpdate,
      })
    );
    if (curTask.isDone) {
      dispatch(
        todoReducerActions.updateCompleted({
          id: id,
          updatedTaskPayload: toUpdate,
        })
      );
    } else
      dispatch(
        todoReducerActions.updateTodos({
          id: id,
          updatedTaskPayload: toUpdate,
        })
      );
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
      fetchAPI("UPDATE", "/lists/", {
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
    fetchAPI("DELETE", "/lists/", curCustomSideBarItem.key + ".json");
    customSidebarItems.forEach((item) => {
      if (item.id == id) {
        return;
      }
      prevId = item.id;
    });
    setCurrentSidebarItemId(prevId);
    setCustomSidebarItems((prev) => prev.filter((item) => item.id != id));
    tasks.forEach((curTask) => {
      if (curTask.listTypeId == id)
        fetchAPI("DELETE", "/tasks/", curTask.key + ".json");
    });

    dispatch(
      todoReducerActions.deleteTaskByList({
        id: id,
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
              // flex: 1,
              // flexBasis: "80%",
              width: `calc(80% - ${width}px + ${!isSidebarOpen ? 20 : 0}%)`,
              flexShrink: 1,
              display: "flex",
              position: "relative",
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
                // setIsOpen(false);
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

                  {/* <Box sx={{ ml: "auto", marginRight: "1rem" }}>
                    <SyncAnimation status={status} setStatus={setStatus} />
                  </Box> */}
                </Box>
              </Box>
              <NewTodoTextField
                addTask={addTask}
                currentSidebarItemId={currentSidebarItemId}
              />
              <TodoList
                currentSidebarItemId={currentSidebarItemId}
                key={currentSidebarItemId}
                handleMarkAsDone={handleMarkAsDone}
                handleSelectedTask={handleSelectedTask}
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
