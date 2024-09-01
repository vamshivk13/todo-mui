import { Box } from "@mui/material";
import React, { useContext } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import { appDataContext } from "../../../../store/AppDataProvider";
import { useDispatch } from "react-redux";
import { todoReducerActions } from "../../../../store/store";
import fetchAPI from "../../../../hooks/fetchAPI";

const MarkAsImportantAction = ({ isStarred, task }) => {
  const { setTasks } = useContext(appDataContext);
  const dispatch = useDispatch();
  function handleMarkAsImportant(e) {
    e.preventDefault();
    e.stopPropagation();
    // setTasks((prev) => {
    //   return prev.map((curTask) => {
    //     if (curTask.id == task.id) {
    //       return {
    //         ...curTask,
    //         isStarred: curTask?.isStarred ? !curTask.isStarred : true,
    //       };
    //     } else {
    //       return curTask;
    //     }
    //   });
    // });
    let taskIsStarred = false;
    if (task.isStarred) {
      taskIsStarred = task.isStarred;
    }
    console.log(taskIsStarred);
    dispatch(
      todoReducerActions.updateTask({
        id: task.id,
        updatedTaskPayload: {
          isStarred: !taskIsStarred,
        },
      })
    );
    if (task.isDone) {
      dispatch(
        todoReducerActions.updateCompleted({
          id: task.id,
          updatedTaskPayload: {
            isStarred: !taskIsStarred,
          },
        })
      );
    } else
      dispatch(
        todoReducerActions.updateTodos({
          id: task.id,
          updatedTaskPayload: {
            isStarred: !taskIsStarred,
          },
        })
      );
    // update the curTask to the firebase
    fetchAPI("UPDATE", "/tasks/", {
      route: task.key + ".json",
      data: {
        ...task,
        isStarred: task?.isStarred ? !task.isStarred : true,
      },
    });
  }
  return (
    <Box
      sx={{
        ml: "auto",
        mr: "8px",
      }}
      onClick={handleMarkAsImportant}
    >
      <StarOutlinedIcon
        sx={{
          transform: "scale(1.1)",
          display: isStarred ? "block" : "none",
        }}
      />
      <StarBorderTwoToneIcon
        sx={{
          transform: "scale(1)",
          display: isStarred ? "none" : "block",
        }}
      />
    </Box>
  );
};

export default MarkAsImportantAction;
