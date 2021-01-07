import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../src/components/NavBar/NavBar";
import theme from "../src/theme";

// Template needed for proper Next.js function
export default function MyApp(props) {
  const { Component, pageProps } = props;

  // IMPORTANT!
  // Removal of this code can (and definitely will) result in Material UI class names not lining up
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>GW2 LFG</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
