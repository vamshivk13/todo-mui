import { Box } from "@mui/material";
import React, { useContext } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import { appDataContext } from "../../../../store/AppDataProvider";
import useFetch from "../../../../hooks/useFetch";

const MarkAsImportantAction = ({ isStarred, task }) => {
  const { setTasks } = useContext(appDataContext);
  const [, updateTask] = useFetch("UPDATE", "/tasks/");
  function handleMarkAsImportant(e) {
    e.preventDefault();
    e.stopPropagation();
    setTasks((prev) => {
      return prev.map((curTask) => {
        if (curTask.id == task.id) {
          return {
            ...curTask,
            isStarred: curTask?.isStarred ? !curTask.isStarred : true,
          };
        } else {
          return curTask;
        }
      });
    });
    // update the curTask to the firebase
    updateTask({
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
