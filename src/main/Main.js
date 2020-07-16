import React, { useState } from "react";

import Lists from "./components/Lists/Lists";
import Log from "./components/Log/Log";

import { ViewContext } from "mainContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import override from "./overrides";

const Main = props => {
  const data = props.data;
  const [view, setView] = useState(0);

  const defaultTheme = createMuiTheme();

  const theme = {
    ...props.theme,
    override: override(defaultTheme)
  };

  const mainTheme = createMuiTheme(theme);

  const RenderView = props => {
    const { view, data } = props.data;
    let selectedView = <Lists data={data} />;
    switch (view) {
      case 0:
        selectedView = <Lists data={data} />;
        break;
      case 1:
        selectedView = <Log />;
        break;
    }
    return selectedView;
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <ViewContext.Provider value={{ view, setView }}>
        <CssBaseline />
        <RenderView data={{ view, data }} />
      </ViewContext.Provider>
    </ThemeProvider>
  );
};

export default Main;
