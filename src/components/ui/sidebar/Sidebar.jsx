import React from "react";
import {
  CardContent,
  Card,
  Typography,
  Box,
  Paper,
  colors,
  Badge,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
const Sidebar = () => {
  return (
    <Box sx={{ flex: 0.25 }}>
      <Paper
        sx={{
          display: "flex",

          flexShrink: 0,
          flexDirection: "column",
          height: "100%",
          // gap: "1rem",
          position: "relative",
          overflowY: "auto",
          boxShadow:
            "0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {[1, 2, 3, 4, 5, 5, 6, 1, 2, 3, 4, 5, 5, 6, 1, 2, 3, 4, 5, 5, 6].map(
          (item, index) => {
            return (
              <Paper
                sx={{
                  borderRadius: "none",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <Card
                  sx={{
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      overflow: "hidden",
                      padding: "13px 1.5rem !important",
                      display: "flex",
                      border: "none !important",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <FormatListBulletedIcon sx={{ fontSize: "1rem" }} />
                    <Typography
                      noWrap
                      variant="body1"
                      sx={{
                        wordBreak: "break-all",
                        height: "100%",
                        marginRight: "auto",
                        // opacity: "0.7",
                      }}
                      color={"textSecondary"}
                    >
                      Task {index}
                    </Typography>
                    <Badge sx={{ opacity: 0.8 }}>{item}</Badge>
                  </CardContent>
                </Card>
              </Paper>
            );
          }
        )}
      </Paper>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50px",
        }}
      >
        <Paper
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            // gap: "1rem",
            paddingX: "13px",
          }}
        >
          <IconButton>
            <AddIcon />
          </IconButton>
          <Typography variant="body1" sx={{ marginRight: "auto" }}>
            New List
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Sidebar;
