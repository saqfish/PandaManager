import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Popup from "./Popup";
import Manager from "./Manager";
import Settings from "./Settings";
// import CommingSoon from "./CommingSoon";

const docs = [null, <Popup/>, <Manager />, <Settings />];

const Docs = props => {
  const { data } = props.data;

  const DocsRender = props => {
    return docs[props.page];
  };

  const theme = {
    ...props.theme
  };

  const mainTheme = createMuiTheme(theme);
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <DocsRender page={data.page} />
    </ThemeProvider>
  );
};

export default Docs;
