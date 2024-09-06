import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { sidebarItems as defaultSidebarItems } from "../util/getSidebarItems";

export const appDataContext = createContext();
const AppDataProvider = ({ children }) => {
  const [currentSidebarItemId, setCurrentSidebarItemId] = useState("MyDay");
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  return (
    <appDataContext.Provider
      value={{
        tasks,
        setTasks,
        currentSidebarItemId,
        setCurrentSidebarItemId,
      }}
    >
      {children}
    </appDataContext.Provider>
  );
};

export default AppDataProvider;
