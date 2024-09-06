import { Box, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { appDataContext } from "../../../../store/AppDataProvider";
import { v4 as uuidv4 } from "uuid";
import TodoDeleteDialog from "./TodoDeleteDialog";
import { appStateContext } from "../../../../store/ApplicationStateProvider";
import { useDispatch, useSelector } from "react-redux";
import { todoReducerActions } from "../../../../store/store";
import fetchAPI from "../../../../hooks/fetchAPI";

const TodoMenu = ({ anchorPosition, setContextMenu, isOpen, task }) => {
  const { setTasks, currentSidebarItemId } = useContext(appDataContext);
  const sidebarItems = useSelector((state) => state.sidebar.sidebarItems);
  const customSidebarItems = useSelector(
    (state) => state.sidebar.customSidebarItems
  );

  const [moveAnchor, setMoveAnchor] = useState(null);
  const isMoveOpen = Boolean(moveAnchor);
  const [copyAnchor, setCopyAnchor] = useState(null);
  const isCopyOpen = Boolean(copyAnchor);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    settingsState: { isDeleteAlertEnabled },
  } = useContext(appStateContext);

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
    dispatch(
      todoReducerActions.updateTask({
        id: curTask.id,
        updatedTaskPayload: toUpdate,
      })
    );
    dispatch(
      todoReducerActions.moveTodo({ id: curTask.id, isDone: curTask.isDone })
    );
    fetchAPI("UPDATE", "/tasks/", {
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
    dispatch(todoReducerActions.addTask(updatedTask));
    const { name: key } = await fetchAPI("POST", "/tasks.json", updatedTask);
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
    setContextMenu(null);
  }

  function handleDeleteTask(e) {
    e.preventDefault();
    e.stopPropagation();
    const curTask = task;
    dispatch(todoReducerActions.deleteTask({ id: curTask.id }));

    fetchAPI("DELETE", "/tasks/", curTask.key + ".json");
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
        <MenuItem
          onClick={(e) => {
            if (isDeleteAlertEnabled) {
              handleDeleteTaskDialog(e);
            } else {
              handleDeleteTask(e);
            }
          }}
        >
          Delete
        </MenuItem>
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
