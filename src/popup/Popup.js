import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const Popup = props => {
  // const data = props.data;
  const defaultTheme = createMuiTheme();

  console.log("popup load");

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

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      Popup
    </ThemeProvider>
  );
};

export default Popup;
