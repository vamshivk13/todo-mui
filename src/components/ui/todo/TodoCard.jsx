import React from "react";
import { Paper, Card, CardContent, Typography } from "@mui/material";
const TodoCard = ({ task, handleSelectedTask }) => {
  return (
    <Paper elevation={1} onClick={() => handleSelectedTask(task.id)}>
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
            alignItems: "center",
          }}
        >
          <Typography variant="body1" noWrap>
            {task.task}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default TodoCard;
