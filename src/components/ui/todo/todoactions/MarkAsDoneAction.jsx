import React, { useState } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton } from "@mui/material";

const MarkAsDoneAction = ({ isDone, handleMarkAsDone }) => {
  const [showHoverEffect, setShowHoverEffect] = useState(false);
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
          onMouseEnter={() => setShowHoverEffect(true)}
          onMouseLeave={() => setShowHoverEffect(false)}
          onBlur={() => showHoverEffect(false)}
        >
          {!showHoverEffect ? (
            <RadioButtonUncheckedIcon
              sx={{
                opacity: "0.5",
                "&:hover": {
                  opacity: 1,
                },
              }}
            />
          ) : (
            <CheckCircleOutlineIcon />
          )}
        </IconButton>
      )}
    </>
  );
};

export default MarkAsDoneAction;
