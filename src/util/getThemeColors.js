export const colors = ["#2196f3", "#f44336", "#4caf50", "#ff9800", "#ffeb3b"];

export const colorThemeObject = (theme, currentColor) => {
  return {
    ...theme,
    typography: {
      ...theme.typography,
      body1: {
        color: currentColor,
      },
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: currentColor, // Default color for IconButton (using primary color)
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: currentColor, // Default color for IconButton (using primary color)
          },
        },
      },
    },
  };
};
