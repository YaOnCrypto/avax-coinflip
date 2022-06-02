import React, { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import "./css/coinflip.css"
import { CoinFlip } from "components/Coinflip";
import Footer from "components/Footer";

import { MoralisProvider } from "react-moralis";
import "./css/index.css";
import "./css/app.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import QuickStart from "components/QuickStart";

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
    );

  return (
    <div className="App">
      <header className="App-header">
        <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <Header />
          <CoinFlip />
          <Footer />
        </MoralisProvider>
      </header>
    </div>
  );
};

ReactDOM.render(
  <StrictMode>
    <Application />
  </StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
