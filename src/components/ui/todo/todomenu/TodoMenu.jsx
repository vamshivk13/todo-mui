import { Box, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { appDataContext } from "../../../../store/AppDataProvider";
import useFetch from "../../../../hooks/useFetch";
import { v4 as uuidv4 } from "uuid";
import TodoDeleteDialog from "./TodoDeleteDialog";

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
    const curTask = task;
    const toMoveListId = item.id;
    const curDate = Date.now();

    const toUpdate =
      toMoveListId == "MyDay"
        ? { listTypeId: toMoveListId, createdAt: curDate }
        : { listTypeId: toMoveListId };
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
    const curTask = task;
    const toCopyListId = item.id;
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
    const { name: key } = await postTask(updatedTask);
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id == id) {
          return { ...task, key };
        } else return task;
      });
    });
    setCopyAnchor(null);
  }

  function handleDeleteTaskDialog(e) {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleteDialogOpen(true);
  }

  function handleDeleteTask(e) {
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
        <MenuItem onClick={handleDeleteTaskDialog}>Delete</MenuItem>
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
      <TodoDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        handleDeleteTask={handleDeleteTask}
      />
    </Box>
  );
};

export default TodoMenu;
