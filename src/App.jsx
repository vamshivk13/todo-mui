import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import TodoPage from "./pages/TodoPage";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
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
      },
    },
  });
  return (
    <ThemeProvider theme={mode == "light" ? lightTheme : darkTheme}>
      <CssBaseline>
        <Box sx={{ height: "100%" }}>
          <TodoPage setMode={setMode} mode={mode} />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
