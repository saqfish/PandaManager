import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Docs from "./Docs";

import * as browser from "webextension-polyfill";

import { messages } from "constants";

browser.runtime
  .sendMessage({ type: messages.initDocs, data: {} })
  .then(res => {
    ReactDOM.render(
      <Docs theme={res.theme} data={res}/>,
      document.getElementById("root")
    );
  });
