import React from "react";
import ReactDOM from "react-dom";
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
        cycling={res.cycling}
        single={res.single}
      />,
      document.getElementById("root")
    );
  });
