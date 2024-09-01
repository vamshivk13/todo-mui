import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { sidebarItems as defaultSidebarItems } from "../util/getSidebarItems";

export const appDataContext = createContext();
const AppDataProvider = ({ children }) => {
  const [customSidebarItems, setCustomSidebarItems] = useState(
    // "customSideBarItems",
    []
  );
  const [currentSidebarItemId, setCurrentSidebarItemId] = useState("MyDay");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [sidebarItems, setSidebarItems] = useState(
    // "sidebarItems",
    defaultSidebarItems
  );

  return (
    <appDataContext.Provider
      value={{
        customSidebarItems,
        setCustomSidebarItems,
        tasks,
        setTasks,
        sidebarItems,
        currentSidebarItemId,
        setCurrentSidebarItemId,
        setSidebarItems,
      }}
    >
      {children}
    </appDataContext.Provider>
  );
};

export default AppDataProvider;
