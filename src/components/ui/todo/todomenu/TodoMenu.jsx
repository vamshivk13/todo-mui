import { Box, Menu, MenuItem } from "@mui/material";
import React, { useContext, useState } from "react";
import { appDataContext } from "../../../../store/AppDataProvider";
import useFetch from "../../../../hooks/useFetch";

const TodoMenu = ({ anchorPosition, setContextMenu, isOpen, task }) => {
  const [, updateTask, isUpdateSyncing, isUpdateSuccess] = useFetch(
    "UPDATE",
    "/tasks/"
  );
  const { customSidebarItems, setTasks, sidebarItems, currentSidebarItemId } =
    useContext(appDataContext);
  const [moveAnchor, setMoveAnchor] = useState(null);
  const isMoveOpen = Boolean(moveAnchor);
  function handleMove(e) {
    e.preventDefault();
    e.stopPropagation();
    setMoveAnchor(e.currentTarget);
  }

  function handleMoveToList(item) {
    //move to the list with id = item.id
    // 1. get the task object
    const curTask = task;
    // 2. get the list type id
    const toMoveListId = item.id;

    // 4. update the same on tasks state
    setTasks((prev) => {
      return prev.map((item) => {
        if (item.id == curTask.id) {
          return {
            ...item,
            listTypeId: toMoveListId,
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
        listTypeId: toMoveListId,
      },
    });
    setMoveAnchor(null);
  }

  return (
    <Box>
      <Menu
        open={isOpen}
        anchorPosition={anchorPosition}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
      >
        <MenuItem>Copy</MenuItem>
        <MenuItem onClick={handleMove}>Move</MenuItem>
        <MenuItem>Delete</MenuItem>
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
          .filter((item) => item.id !== currentSidebarItemId)
          .map((item) => {
            return (
              <MenuItem onClick={() => handleMoveToList(item)} key={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};

export default TodoMenu;
