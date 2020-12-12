import { Container } from "@material-ui/core";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}
