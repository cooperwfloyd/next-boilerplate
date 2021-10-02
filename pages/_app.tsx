import {useEffect} from "react";
import type {AppProps} from "next/app";
import ReactGA from "react-ga";
import "../src/styles/scss/global.scss";

const App = ({Component, pageProps}: AppProps) => {
  useEffect(() => {
    if(process.env.NODE_ENV === "production") {
      if(process.env.googleAnalyticsID) {
        ReactGA.initialize(process.env.googleAnalyticsID);
        ReactGA.pageview(window.location.pathname + window.location.search);
      }
    }
  });

  return <Component {...pageProps}/>
}

export default App;
