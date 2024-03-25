import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import TodoPage from "./pages/TodoPage";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // const [mode, setMode] = useState("light");
  const [mode, setMode] = useLocalStorage("mode", "dark");
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontSize: 13,
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
    <ThemeProvider theme={mode == "light" ? lightTheme : darkTheme}>
      <CssBaseline>
        <Box className={mode} sx={{ height: "100%" }}>
          <TodoPage setMode={setMode} mode={mode} />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
