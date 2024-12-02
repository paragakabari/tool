// import '../styles/globals.css'
import React, { useState, useEffect } from "react";
import "../styles/mixins/global.scss";
import "../styles/style.css";
import { wrapper } from "../src/store";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  return !initialRenderComplete ? null : <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
