import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { authContext } from "./AuthProvider";

export const appStateContext = createContext();
const ApplicationStateProvider = ({ children }) => {
  // App States
  // Settings
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const [settingsState, setSettingsState] = useState({
    isSoundEnabled: true,
  });
  const [settings, fetchSettingsState] = useFetch("GET", "/settings.json");

  // screenWidth
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTempSidebarOpen, setIsTempSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (window.innerWidth < 600) {
      setIsTempSidebarOpen(true);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth > 900) setIsTempSidebarOpen(false);
    if (screenWidth > 600 && screenWidth < 900) {
      setIsSidebarOpen(false);
    }
    if (screenWidth < 600) {
      setIsSidebarOpen(false);
    }
    if (screenWidth > 900 && isTempSidebarOpen) {
      setIsSidebarOpen(true);
    }
  }, [screenWidth]);

  const {
    user: { userId },
  } = useContext(authContext);
  //load settingState from firebase
  useEffect(() => {
    if (userId) fetchSettingsState(null);
  }, [userId]);

  //updating local setting state from firebase
  useEffect(() => {
    const keys = Object.keys(settings || {});
    if (keys[0]) {
      setSettingsState({ ...settings[keys[0]], key: keys[0] });
    }
  }, [settings]);

  return (
    <appStateContext.Provider
      value={{
        isSettingsOpened,
        setIsSettingsOpened,
        settingsState,
        setSettingsState,
        screenWidth,
        isTempSidebarOpen,
        setIsTempSidebarOpen,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </appStateContext.Provider>
  );
};

export default ApplicationStateProvider;
