import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
} from "@material-ui/core";
import NavBar from "../components/NavBar/NavBar";
import "../styles/global.css";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ce2e26",
      contrastText: "#000000",
    },
    secondary: {
      main: "#262622",
      contrastText: "#ffffff",
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
      <NavBar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
