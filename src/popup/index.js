import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popup from "./Popup";

import * as browser from "webextension-polyfill";

import { messages } from "constants";

browser.runtime
  .sendMessage({ type: messages.initPopup, data: {} })
  .then(res => {
    ReactDOM.render(
      <Popup
        theme={res.theme}
        data={res.data}
      />,
      document.getElementById("root")
    );
  });
