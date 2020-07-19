import React, { useState } from "react";

import Manager from "./components/Manager/Manager";
import Log from "./components/Log/Log";

import { ViewContext } from "mainContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import override from "./overrides";

const Main = props => {
  const data = props.data;
  const cycling = props.cycling;
  const [view, setView] = useState(0);

  const defaultTheme = createMuiTheme();

  const theme = {
    ...props.theme,
    override: override(defaultTheme)
  };

  const mainTheme = createMuiTheme(theme);

  const RenderView = props => {
    const { view, data, cycling } = props.data;
    let selectedView = <Manager data={data} cycling={cycling} />;
    switch (view) {
      case 0:
        selectedView = <Manager data={data} cycling={cycling} />;
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
        <RenderView data={{ view, data, cycling }} />
      </ViewContext.Provider>
    </ThemeProvider>
  );
};

export default Main;
