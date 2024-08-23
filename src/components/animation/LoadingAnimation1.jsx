import { Box, duration, useTheme } from "@mui/material";
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { TbLetterL } from "react-icons/tb";
import {
  TbLetterO,
  TbLetterA,
  TbLetterD,
  TbLetterI,
  TbLetterN,
  TbLetterG,
} from "react-icons/tb";

const LoadingAnimation = ({ isTyping }) => {
  // const color = useTheme().palette.mode == "dark" ? "white" : "black";
  const spring1 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    delay: 0,
    // loop: isTyping,
  });
  const spring2 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    // loop: isTyping,
    delay: 20,
  });

  const spring3 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    // loop: isTyping,
    delay: 40,
  });

  const spring4 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    // loop: isTyping,
    delay: 60,
  });
  const spring5 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    // loop: isTyping,
    delay: 80,
  });
  const spring6 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    // loop: isTyping,
    delay: 100,
  });

  const spring7 = useSpring({
    from: { y: 0 },
    to: [{ y: 7 }],
    config: { tension: 180, friction: 12 },
    // loop: isTyping,
    delay: 120,
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
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterL />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring2,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterO />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring3,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterA />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring4,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterD />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring1,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterI />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring5,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterN />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring6,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          <TbLetterG />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring7,
            marginBottom: "2px",
            // height: "30px",
            padding: "0.5rem ",
            // backgroundColor: color,
            borderRadius: "4px",
            fontWeight: "600",
            opacity: "0.8",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          .
        </animated.div>
      )}
    </Box>
  );
};

export default LoadingAnimation;
