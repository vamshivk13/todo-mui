import React, { createContext, useState } from "react";

export const themeContext = createContext();
const ColorThemeProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState(null);
  return (
    <themeContext.Provider value={[currentColor, setCurrentColor]}>
      {children}
    </themeContext.Provider>
  );
};

export default ColorThemeProvider;
