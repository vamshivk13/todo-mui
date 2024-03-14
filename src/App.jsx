import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import TodoPage from "./pages/TodoPage";
import { light } from "@mui/material/styles/createPalette";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <Box sx={{ height: "100%" }}>
          <TodoPage />
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
