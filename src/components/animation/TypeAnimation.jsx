import { Box, duration, useTheme } from "@mui/material";
import React from "react";
import { animated, useSpring } from "@react-spring/web";

const TypeAnimation = ({ isTyping }) => {
  const spring1 = useSpring({
    from: { y: 0 },
    to: { y: -7 },
    // config: { duration: 300 },
    loop: isTyping,
  });
  const spring2 = useSpring({
    from: { y: 0 },
    to: { y: -7 },
    delay: 50,
    // config: { duration: 300 },
    loop: isTyping,
  });
  const spring3 = useSpring({
    from: { y: 0 },
    to: { y: -7 },
    // config: { duration: 300 },
    delay: 100,
    loop: isTyping,
  });
  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // bgcolor: "green",
        ml: "auto",
      }}
    >
      {isTyping && (
        <>
          <animated.div
            style={{
              borderRadius: "50%",
              height: "8px",
              width: "8px",
              backgroundColor: useTheme().typography.body1.color,
              ...spring1,
            }}
          ></animated.div>
          <animated.div
            style={{
              borderRadius: "50%",
              height: "8px",
              width: "8px",
              backgroundColor: useTheme().typography.body1.color,
              ...spring2,
            }}
          ></animated.div>
          <animated.div
            style={{
              borderRadius: "50%",
              height: "8px",
              width: "8px",
              backgroundColor: useTheme().typography.body1.color,
              ...spring3,
            }}
          ></animated.div>
        </>
      )}
    </Box>
  );
};

export default TypeAnimation;
