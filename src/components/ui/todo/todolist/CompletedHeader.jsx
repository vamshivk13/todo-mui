import React, { useContext } from "react";
import { Badge, Box, Paper, Typography, useTheme } from "@mui/material";
import { themeContext } from "../../../../store/ColorThemeProvider";

const CompletedHeader = ({ count }) => {
  const [currentColor] = useContext(themeContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        mt: 2,
        mb: 1,

        mr: "auto",
      }}
    >
      <Paper sx={{ padding: "3px 10px" }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: "13px",
            fontWeight: "600",
            borderRadius: "5px",
          }}
        >
          Completed
        </Typography>
      </Paper>
      <Typography
        variant="body1"
        sx={{
          fontFamily: "Grey Qo",
          fontSize: "3ch",
          fontWeight: "600",
        }}
      >
        {count}
      </Typography>
    </Box>
  );
};

export default CompletedHeader;
