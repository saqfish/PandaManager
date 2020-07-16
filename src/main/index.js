import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./Main";

import * as browser from "webextension-polyfill";

import { messages } from "constants";

browser.runtime
  .sendMessage({ type: messages.initMain, data: {} })
  .then(res => {
    ReactDOM.render(
      <Main
        theme={res.theme}
        data={res.data}
      />,
      document.getElementById("root")
    );
  });