import {
  Alert,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import useLocalStorage from "./hooks/useLocalStorage";
import RoutesProvider from "./routes/RoutesProvider";
import Header from "./components/ui/header/Header";
import AuthProvider from "./store/AuthProvider";
import AlertProvider from "./store/AlertProvider";
import ColorThemeProvider from "./store/ColorThemeProvider";
import ApplicationStateProvider from "./store/ApplicationStateProvider";
import AppDataProvider from "./store/AppDataProvider";

function App() {
  const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const [mode, setMode] = useLocalStorage("mode", isDark ? "dark" : "light");
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
    <ThemeProvider theme={mode == "dark" ? darkTheme : lightTheme}>
      <CssBaseline>
        <AuthProvider>
          <AlertProvider>
            <ColorThemeProvider>
              <AppDataProvider>
                <ApplicationStateProvider>
                  <Box className={mode} sx={{ height: "100%" }}>
                    <Header setMode={setMode} mode={mode} />
                    <RoutesProvider mode={mode} setMode={mode}></RoutesProvider>
                  </Box>
                </ApplicationStateProvider>
              </AppDataProvider>
            </ColorThemeProvider>
          </AlertProvider>
        </AuthProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
