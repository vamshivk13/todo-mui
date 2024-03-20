import React from "react";
import { Paper, InputBase, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NewTodoTextField = ({ value, setValue, addTask }) => {
  return (
    <Box
      component={"form"}
      sx={{
        display: "flex",
        flexDirection: "row",
        px: "1rem",
        gap: "1rem",
        paddingTop: "10px",
        marginTop: "10px",
      }}
      onSubmit={addTask}
    >
      <Paper
        sx={{
          flex: 1,
          display: "flex",
          padding: "3px 10px",
          boxShadow:
            "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <InputBase
          id="todo"
          placeholder="Add Todo"
          size="medium"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            flex: 1,
            borderWidth: "2px",
            borderRadius: "10px !important",
          }}
        />
        <IconButton type="submit">
          <AddIcon
            sx={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default NewTodoTextField;
