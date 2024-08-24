import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React from "react";

const TodoDeleteDialog = ({ isOpen, onClose, handleDeleteTask }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Typography>Do you want to delete this task ?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteTask}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TodoDeleteDialog;
