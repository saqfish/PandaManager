import React, { useEffect, useState } from "react";

import * as browser from "webextension-polyfill";

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

import PlayIcon from "@material-ui/icons/PlayArrow";

import PopupAppBar from "./components/PopupAppBar/PopupAppBar";

import override from "./overrides";
import style from "./styles";

const Popup = props => {
  const [data, setData] = useState(props.data.pandas);
  const defaultTheme = createMuiTheme();

  const theme = {
    ...props.theme,
    overrides: override(defaultTheme)
  };

  const isDark = props.theme.palette.type == "dark";
  const useStyles = makeStyles(() => style(isDark));

  const mainTheme = createMuiTheme(theme);
  const classes = useStyles();

  useEffect(() => {
    var port = browser.runtime.connect({ name: "scrapeConnection" });
    port.onMessage.addListener(res => {
      console.log(res);
      setData(res);
    });
    return () => {
      port.onMessage.removeListener();
    };
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <PopupAppBar />
        {data.map(item => (
          <List>
            <ListItem selected={item.selected} dense={true}>
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
