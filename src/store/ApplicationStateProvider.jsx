import React, { createContext, useState } from "react";

export const appStateContext = createContext();
const ApplicationStateProvider = ({ children }) => {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  return (
    <appStateContext.Provider value={{ isSettingsOpened, setIsSettingsOpened }}>
      {children}
    </appStateContext.Provider>
  );
};

export default ApplicationStateProvider;
