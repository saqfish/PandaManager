import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Button from "@material-ui/core/Button";
import LaunchIcon from "@material-ui/icons/Launch";
import PlayIcon from "@material-ui/icons/PlayArrow";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const Popup = props => {
  const data = props.data;
  const defaultTheme = createMuiTheme();

  console.log(data);

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
  const useStyles = makeStyles(() => ({
    root: {
      minWidth: 500,
      display: "flex",
      flexDirection: "column"
    },
    bar: { flexGrow: 1 },
    title: { flexGrow: 1 }
  }));

  const mainTheme = createMuiTheme(theme);
  const classes = useStyles();

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              Panda Manager
            </Typography>
            <Button
              onClick={() => sendToBackground(messages.openPage, "main.html")}
              disableElevation
            >
              <LaunchIcon />
            </Button>
            <Button
              onClick={() =>
                sendToBackground(messages.openPage, "options.html")
              }
              disableElevation
            >
              <SettingsIcon />
            </Button>
          </Toolbar>
        </AppBar>
        {data.pandas.map(item => (
          <List>
            <ListItem>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <PlayIcon />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default Popup;
