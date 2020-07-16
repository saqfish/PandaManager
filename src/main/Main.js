import React, { useState } from "react";

import Lists from "./components/Lists/Lists";
import Log from "./components/Log/Log";

import { ViewContext } from "mainContext";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const Main = props => {
  const data = props.data;
  const [view, setView] = useState(0);

  const defaultTheme = createMuiTheme();

  const theme = {
    ...props.theme,
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*": {
            "scrollbar-width": "thin"
          },
          "*::-webkit-scrollbar": {
            height: 3,
            width: 10
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#000000"
          }
        }
      },
      MuiToolbar: {
        gutters: {
          [defaultTheme.breakpoints.up("sm")]: {
            paddingLeft: 0,
            paddingRight: 0,
            flex: 1
          }
        }
      },
      MuiIconButton: {
        root: {
          color: "white"
        }
      },
      MuiTableCell: {
        sizeSmall: {
          borderRadius: 0,
          padding: "6px 24px 6px 2px"
        }
      }
    }
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
