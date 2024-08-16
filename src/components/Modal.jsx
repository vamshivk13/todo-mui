import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  InputBase,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Modal = ({ title, content, isOpen, onClose }) => {
  const [value, setValue] = useState(content?.task);
  useEffect(() => {
    setValue(content?.task);
  }, [content?.task]);
  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      sx={{ position: "relative" }}
      open={isOpen}
      variant="temporary"
    >
      <DialogTitle>{title}</DialogTitle>
      {/* <DialogContent sx={{ py: "1rem", width: "400px" }}>
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
      </DialogActions> */}
      This is a drawer component
    </Drawer>
  );
};

export default Modal;
