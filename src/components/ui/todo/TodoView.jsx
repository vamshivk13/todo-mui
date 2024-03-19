import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
import { useState } from "react";

const TodoView = ({
  isOpen,
  content,
  onClose,
  handleDeleteTask,
  handleMarkAsDone,
  handleEditTask,
}) => {
  const [value, setValue] = useState(content?.task);

  useEffect(() => {
    setValue(content?.task);
  }, [content.task]);
  return (
    <Box
      sx={{
        flex: "0.35",
        height: "100%",
      }}
    >
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader title="Todo Details"></CardHeader>
        <CardContent sx={{ py: "1rem", flex: 1 }}>
          <InputBase
            type="text"
            value={value}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleEditTask(value);
              }
            }}
            // defaultValue={"efasd"}
            autoFocus="autofocus"
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            onChange={(e) => setValue(e.target.value)}
            multiline
            fullWidth
            sx={{
              padding: "6px 0rem",
              border: "none",
              outline: "none",
            }}
            // variant="outlined"
          ></InputBase>
        </CardContent>
        <CardActions sx={{ padding: "1rem" }}>
          <IconButton onClick={handleDeleteTask} variant="outlined">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={handleMarkAsDone} variant="outlined">
            {content?.isDone ? <UndoIcon /> : <DoneIcon />}
          </IconButton>

          <IconButton
            type="submit"
            variant="outlined"
            onClick={() => handleEditTask(value)}
          >
            <SaveIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default TodoView;
