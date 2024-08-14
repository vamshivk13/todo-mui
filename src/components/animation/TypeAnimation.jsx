import { Box, duration, useTheme } from "@mui/material";
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { GoDotFill } from "react-icons/go";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const TypeAnimation = ({ isTyping }) => {
  const spring1 = useSpring({
    from: { y: 0, transform: "scale(1)" },
    to: [{ y: 5 }, { transform: "scale(1.5)" }],
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
          }}
        >
          {/* <FiberManualRecordIcon sx={{ fontSize: "12px", p: 0, m: 0 }} /> */}
          <GoDotFill />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring2,
            marginBottom: "2px",
          }}
        >
          {/* <FiberManualRecordIcon sx={{ fontSize: "12px", p: 0, m: 0 }} /> */}
          <GoDotFill />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            marginBottom: "2px",
            ...spring3,
          }}
        >
          {/* <FiberManualRecordIcon sx={{ fontSize: "12px", p: 0, m: 0 }} /> */}
          <GoDotFill />
        </animated.div>
      )}
    </Box>
  );
};

export default TypeAnimation;
