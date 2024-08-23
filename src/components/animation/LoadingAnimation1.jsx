import { Box, duration, useTheme } from "@mui/material";
import React from "react";
import { animated, useSpring } from "@react-spring/web";
import { TbLetterL } from "react-icons/tb";
import {
  TbSquareLetterL,
  TbSquareLetterO,
  TbSquareLetterA,
  TbSquareLetterD,
  TbSquareLetterI,
  TbSquareLetterN,
  TbSquareLetterG,
} from "react-icons/tb";
import {
  TbSquareRoundedLetterLFilled,
  TbSquareRoundedLetterOFilled,
  TbSquareRoundedLetterAFilled,
  TbSquareRoundedLetterDFilled,
  TbSquareRoundedLetterIFilled,
  TbSquareRoundedLetterNFilled,
  TbSquareRoundedLetterGFilled,
} from "react-icons/tb";

const LoadingAnimation = ({ isTyping }) => {
  // const color = useTheme().palette.mode == "dark" ? "white" : "black";
  const spring1 = useSpring({
    from: {
      transform: "translateY(0px)",
    }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    delay: 75,
    loop: {
      delay: 2025,
    },

    // loop: isTyping,
  });
  const spring2 = useSpring({
    from: { transform: "translateY(0px)" }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    // loop: isTyping,
    delay: 375,
    loop: {
      delay: 2025,
    },
  });

  const spring3 = useSpring({
    from: { transform: "translateY(0px)" }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    // loop: isTyping,
    delay: 675,
    loop: {
      delay: 2025,
    },
  });

  const spring4 = useSpring({
    from: { transform: "translateY(0px)" }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    // loop: isTyping,
    delay: 975,
    loop: {
      delay: 2025,
    },
  });
  const spring5 = useSpring({
    from: { transform: "translateY(0px)" }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    // loop: isTyping,
    delay: 1275,
    loop: {
      delay: 2025,
    },
  });
  const spring6 = useSpring({
    from: { transform: "translateY(0px)" }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    // loop: isTyping,
    delay: 1575,
    loop: {
      delay: 2025,
    },
  });

  const spring7 = useSpring({
    from: { transform: "translateY(0px)" }, // Start from y: 0px
    to: async (next) => {
      await next({ transform: "translateY(15px) scale(0.8)" }); // Move to y: 30px
      await next({ transform: "translateY(0px) scale(1)" }); // Move back to y: 0px
    },
    config: { tension: 180, friction: 12, duration: 150 },
    // loop: isTyping,
    delay: 1875,
    loop: {
      delay: 2025,
    },
  });

  return (
    <animated.div
      style={{
        display: "flex",
        gap: "1px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        // bgcolor: "green",s
        fontSize: "2rem",
      }}
    >
      {isTyping && (
        <animated.div
          style={{
            ...spring1,
          }}
        >
          <TbSquareLetterL />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring2,
          }}
        >
          <TbSquareLetterO />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring3,
          }}
        >
          <TbSquareLetterA />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring4,
          }}
        >
          <TbSquareLetterD />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring5,
          }}
        >
          <TbSquareLetterI />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring6,
          }}
        >
          <TbSquareLetterN />
        </animated.div>
      )}
      {isTyping && (
        <animated.div
          style={{
            ...spring7,
          }}
        >
          <TbSquareLetterG />
        </animated.div>
      )}
    </animated.div>
  );
};

export default LoadingAnimation;
