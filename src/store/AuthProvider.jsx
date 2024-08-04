import React, { createContext, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence);
  const [user, setUser] = useState({
    isAuthenticated: false,
    userId: null,
    accessToken: null,
    displayName: null,
    isLoading: false,
  });

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
