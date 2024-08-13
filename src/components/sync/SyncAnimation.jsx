import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaSync, FaCheck, FaExclamation } from "react-icons/fa";
import { Box } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import SyncIcon from "@mui/icons-material/Sync";

const SyncAnimation = ({ status, setStatus }) => {
  const syncingAnimation = useSpring({
    transform: status === "syncing" ? "rotate(360deg)" : "rotate(0deg)",
    config: { duration: 300 },
    loop: status === "syncing",
  });

  const successAnimation = useSpring({
    opacity: status === "success" ? 1 : 0,
    transform: status === "success" ? "scale(1)" : "scale(0.5)",
    config: { tension: 200, friction: 10 },
  });

  const errorAnimation = useSpring({
    opacity: status === "error" ? 1 : 0,
    transform: status === "error" ? "scale(1)" : "scale(0.5)",
    config: { tension: 200, friction: 10 },
  });

  return (
    <Box sx={{ ml: "auto" }}>
      {status === "syncing" && (
        <animated.div style={syncingAnimation}>
          <SyncIcon />
        </animated.div>
      )}

      {status === "success" && (
        <animated.div style={successAnimation}>
          <DoneIcon />
        </animated.div>
      )}

      {status === "error" && (
        <animated.div style={errorAnimation}>
          <FaExclamation style={{ fontSize: "1rem", color: "red" }} />
        </animated.div>
      )}
    </Box>
  );
};

export default SyncAnimation;
