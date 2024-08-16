import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import TodoPage from "../pages/TodoPage";

const RoutesProvider = ({ children, mode, setMode }) => {
  const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    {
      path: "/home",
      element: <TodoPage setMode={setMode} mode={mode} />,
    },
  ]);

  return <RouterProvider router={router}>{children}</RouterProvider>;
};

export default RoutesProvider;
