import { Box, duration, useTheme } from "@mui/material";
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { GoDotFill } from "react-icons/go";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const LoadingAnimation = ({ isTyping }) => {
  const color = useTheme().palette.mode == "dark" ? "white" : "black";
  const spring1 = useSpring({
    from: { width: "0px", color: color, transform: "scale(1)" },
    to: [
      {
        width: "100%",
        color: useTheme().palette.mode == "dark" ? "black" : "white",
      },
      { transform: "scale(1.5)" },
    ],
    config: { tension: 180, friction: 12 },

    // config: { duration: 300 },
    loop: isTyping,
  });
  const spring2 = useSpring({
    from: { y: 0, transform: "scale(1)" },
    to: [{ y: 5 }, { transform: "scale(1.5)" }],
    config: { tension: 180, friction: 12 },
    delay: 50,
    // config: { duration: 300 },
    loop: isTyping,
  });
  const spring3 = useSpring({
    from: { y: 0, transform: "scale(1)" },
    to: [{ y: 5 }, { transform: "scale(1.5)" }],
    config: { tension: 180, friction: 12 },
    // config: { duration: 300 },
    delay: 80,
    loop: isTyping,
  });

  return (
    <Box
      sx={{
        display: "flex",
        // gap: "1px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "green",s
      }}
    >
      {isTyping && (
        <animated.div
          style={{
            ...spring1,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          {/* <FiberManualRecordIcon sx={{ fontSize: "12px", p: 0, m: 0 }} /> */}
          {/* <GoDotFill /> */}
          Loading...
        </animated.div>
      )}
    </Box>
  );
};

export default LoadingAnimation;
