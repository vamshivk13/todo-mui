import React, { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";

const MarkAsDoneAction = ({ isDone, handleMarkAsDone }) => {
  return (
    <>
      {isDone ? (
        <IconButton
          sx={{ padding: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            handleMarkAsDone();
          }}
          disableRipple
        >
          <CheckCircleIcon />
        </IconButton>
      ) : (
        <IconButton
          sx={{ padding: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            handleMarkAsDone();
          }}
          disableRipple
        >
          <RadioButtonUncheckedIcon
            sx={{
              opacity: 1,
              "&:hover": {
                opacity: 0,
              },
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <CheckCircleOutlineIcon
            sx={{
              opacity: 0,
              position: "absolute",
              "&:hover": {
                opacity: 1,
              },
            }}
          />
        </IconButton>
      )}
    </>
  );
};

export default MarkAsDoneAction;
