import React, { createContext, useState } from "react";

export const alertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    alertMessage: null,
    alertType: "info",
  });

  return (
    <alertContext.Provider value={{ alert, setAlert }}>
      {children}
    </alertContext.Provider>
  );
};

export default AlertProvider;
