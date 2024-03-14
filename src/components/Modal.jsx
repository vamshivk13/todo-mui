import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";

const Modal = ({
  title,
  content,
  isOpen,
  onClose,
  handleDeleteTask,
  handleMarkAsDone,
  handleEditTask,
}) => {
  console.log(content);
  const [value, setValue] = useState(content?.task);
  useEffect(() => {
    setValue(content?.task);
  }, [content?.task]);
  return (
    <Dialog onClose={onClose} open={isOpen} maxWidth={"sm"} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ py: "1rem" }}>
        <InputBase
          type="text"
          maxRows={10}
          value={value}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleEditTask(value);
            }
          }}
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
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
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
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
