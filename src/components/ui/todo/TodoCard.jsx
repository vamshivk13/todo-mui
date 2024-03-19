import React from "react";
import { Paper, Card, CardContent, Typography, Button } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const TodoCard = ({ task, handleSelectedTask, handleMarkAsDone }) => {
  return (
    <Paper
      elevation={0}
      onClick={(e) => {
        e.stopPropagation();
        handleSelectedTask(task?.id);
      }}
    >
      <Card
        sx={{
          fontSize: "1.2rem",
        }}
      >
        {/* <CardHeader title="title" /> */}
        <CardContent
          sx={{
            overflow: "hidden",
            padding: "13px !important",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {task?.isDone ? (
            <CheckCircleIcon
              sx={{
                opacity: "0.5",
                "&:hover": {
                  opacity: 1,
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsDone(task.id);
              }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              sx={{
                opacity: "0.5",
                "&:hover": {
                  opacity: 1,
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleMarkAsDone(task.id);
              }}
            />
          )}
          <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
            {task?.task}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default TodoCard;
