import React, { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { authContext } from "./AuthProvider";

export const appStateContext = createContext();
const ApplicationStateProvider = ({ children }) => {
  const [isSettingsOpened, setIsSettingsOpened] = useState(false);
  const [settingsState, setSettingsState] = useState({
    isSoundEnabled: true,
  });

  const [settings, fetchSettingsState] = useFetch("GET", "/settings.json");

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
    console.log("Settings", settings);
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
      }}
    >
      {children}
    </appStateContext.Provider>
  );
};

export default ApplicationStateProvider;
