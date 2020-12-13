import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import "../styles/global.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const customTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#262622",
      contrastText: "#ffffff",
    },
    primary: {
      main: "#ce2e26",
      contrastText: "#000000",
    },
    background: {
      default: "#0d1117",
      paper: "#fafafa",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
