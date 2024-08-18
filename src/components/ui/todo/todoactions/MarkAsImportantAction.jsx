import { Box } from "@mui/material";
import React from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";

const MarkAsImportantAction = ({ isStarred, handleMarkAsImportant }) => {
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
