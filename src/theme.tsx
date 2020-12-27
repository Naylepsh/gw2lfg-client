import { createMuiTheme } from "@material-ui/core";

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
      default: "#4e4e49",
      paper: "#fafafa",
    },
  },
});

export default theme;