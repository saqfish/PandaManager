import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Settings from "./Settings";
import Manager from "./Manager";
import CommingSoon from "./CommingSoon";

const docs = [null, <Manager />, <Settings />];

const Docs = props => {
  const { data } = props.data;

  const DocsRender = props => {
    console.log(docs[props.page]);
    return <CommingSoon />;
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
