import { Container, createMuiTheme, ThemeProvider } from "@material-ui/core";
import "../styles/global.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}
