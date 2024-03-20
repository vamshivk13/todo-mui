import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  InputBase,
  Paper,
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
        position: "relative",
      }}
    >
      <Card
        sx={{
          height: "calc(100% - 60px)",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0 !important",
        }}
      >
        <Box sx={{ overflowY: "auto" }}>
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
        </Box>
      </Card>
      <Box
        sx={{
          // padding: "1rem",
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "60px",
          left: 0,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            height: "100%",
            display: "flex",
            borderRadius: "0px !important",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
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
        </Paper>
      </Box>
    </Box>
  );
};

export default TodoView;
