import {
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
      <DialogContent sx={{ pY: "1rem" }}>
        <InputBase
          type="text"
          maxRows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          multiline
          fullWidth
          sx={{
            padding: "1rem",
            border: "none",
            outline: "none",
          }}
          // variant="outlined"
        ></InputBase>
      </DialogContent>
      <DialogActions sx={{ padding: "1rem" }}>
        <Button
          onClick={handleDeleteTask}
          startIcon={<DeleteIcon />}
          variant="outlined"
        >
          Delete
        </Button>
        <Button
          onClick={handleMarkAsDone}
          startIcon={<DoneIcon />}
          variant="outlined"
        >
          {content?.isDone ? "Mark as Todo" : "Mark As Done"}
        </Button>
        <Button variant="outlined" onClick={() => handleEditTask(value)}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
