import { Box, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { appDataContext } from "../../../../store/AppDataProvider";
import useFetch from "../../../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";

const TodoMenu = ({ anchorPosition, setContextMenu, isOpen, task }) => {
  const [, updateTask, isUpdateSyncing, isUpdateSuccess] = useFetch(
    "UPDATE",
    "/tasks/"
  );
  const [, postTask, isPostSyncing, isPostSuccess] = useFetch(
    "POST",
    "/tasks.json"
  );
  const [, deleteTask, isDeleteSyncing, isDeleteSuccess] = useFetch(
    "DELETE",
    "/tasks/"
  );
  const { customSidebarItems, setTasks, sidebarItems, currentSidebarItemId } =
    useContext(appDataContext);
  const [moveAnchor, setMoveAnchor] = useState(null);
  const isMoveOpen = Boolean(moveAnchor);
  const [copyAnchor, setCopyAnchor] = useState(null);
  const isCopyOpen = Boolean(copyAnchor);

  function handleMove(e) {
    e.preventDefault();
    e.stopPropagation();
    setMoveAnchor(e.currentTarget);
  }
  function handleCopy(e) {
    e.preventDefault();
    e.stopPropagation();
    setCopyAnchor(e.currentTarget);
  }

  function handleMoveToList(item) {
    //move to the list with id = item.id
    // 1. get the task object
    const curTask = task;
    // 2. get the list type id
    const toMoveListId = item.id;
    const curDate = Date.now();

    const toUpdate =
      toMoveListId == "MyDay"
        ? { listTypeId: toMoveListId, createdAt: curDate }
        : { listTypeId: toMoveListId };
    // 4. update the same on tasks state
    setTasks((prev) => {
      return prev.map((item) => {
        if (item.id == curTask.id) {
          return {
            ...item,
            ...toUpdate,
          };
        } else {
          return item;
        }
      });
    });
    // 3. update the task based on the key with new list type id to firebase
    updateTask({
      route: curTask.key + ".json",
      data: {
        ...task,
        ...toUpdate,
      },
    });
    setMoveAnchor(null);
  }
  async function handleCopyToList(item) {
    //move to the list with id = item.id
    // 1. get the task object
    const curTask = task;
    // 2. get the list type id
    const toCopyListId = item.id;

    // 3. add a new task with updated id and updated listTypeId
    const id = uuidv4();
    const curDate = Date.now();
    const updatedTask = {
      ...curTask,
      id: id,
      listTypeId: toCopyListId,
      createdAt: curDate,
    };
    setTasks((prev) => {
      return [...prev, updatedTask];
    });
    // 4. Post a new task with the updated id and updated ListTypeId
    const { name: key } = await postTask(updatedTask);
    // 5. update the key at local state when new task is added
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id == id) {
          return { ...task, key };
        } else return task;
      });
    });
    setCopyAnchor(null);
  }

  function handleDeleteTask(e) {
    e.preventDefault();
    e.stopPropagation();
    const curTask = task;
    setTasks((tasks) => tasks.filter((task) => task.id !== curTask.id));
    deleteTask(curTask.key + ".json");
    setContextMenu(null);
  }

  return (
    <Box>
      <Menu
        open={isOpen}
        anchorPosition={anchorPosition}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
      >
        <MenuItem onClick={handleCopy}>Copy</MenuItem>
        <MenuItem onClick={handleMove}>Move</MenuItem>
        <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
      </Menu>
      <Menu
        open={isMoveOpen}
        anchorEl={moveAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => setMoveAnchor(null)}
      >
        {[...sidebarItems, ...customSidebarItems]
          .filter(
            (item) =>
              !(item.id == currentSidebarItemId || item.id == "Important")
          )
          .map((item) => {
            return (
              <MenuItem onClick={() => handleMoveToList(item)} key={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
      </Menu>
      <Menu
        open={isCopyOpen}
        anchorEl={copyAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={() => setCopyAnchor(null)}
      >
        {[...sidebarItems, ...customSidebarItems]
          .filter(
            (item) =>
              !(item.id == currentSidebarItemId || item.id == "Important")
          )
          .map((item) => {
            return (
              <MenuItem onClick={() => handleCopyToList(item)} key={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};

export default TodoMenu;
