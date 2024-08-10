import {
  Alert,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import TodoPage from "./pages/TodoPage";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import RoutesProvider from "./routes/RoutesProvider";
import Header from "./components/Header";
import AuthProvider from "./store/AuthProvider";
import AlertProvider from "./store/AlertProvider";
import ColorThemeProvider from "./store/ColorThemeProvider";

function App() {
  const [mode, setMode] = useLocalStorage("mode", "dark");
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontSize: 13,
      custom: {
        main: "#fff",
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      custom: {
        main: "#000",
      },
      customHeader: {
        main: "#fff",
      },
    },

    typography: {
      fontSize: 13,
      custom: {
        main: "#000",
      },
    },
    components: {
      // Name of the component
      MuiButton: {
        defaultProps: {
          color: "custom",
        },
      },
      MuiAppBar: {
        defaultProps: {
          color: "customHeader",
        },
        styleOverrides: {
          root: {},
        },
      },
    },
  });
  return (
    <ThemeProvider theme={mode == "dark" ? lightTheme : darkTheme}>
      <CssBaseline>
        <AuthProvider>
          <AlertProvider>
            <ColorThemeProvider>
              <Box className={mode} sx={{ height: "100%" }}>
                <Header setMode={setMode} mode={mode} />
                <RoutesProvider mode={mode} setMode={mode}></RoutesProvider>
              </Box>
            </ColorThemeProvider>
          </AlertProvider>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
