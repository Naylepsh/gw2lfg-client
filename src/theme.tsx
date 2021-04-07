import { createMuiTheme } from "@material-ui/core";

/**
 * Css theme for Material UI to use.
 */
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#262622",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ce2e26",
      contrastText: "#ffffff",
    },
    background: {
      default: "#000000",
      paper: "#fafafa",
    },
  },
});

export default theme;
