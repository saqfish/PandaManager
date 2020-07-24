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
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";

import PopupAppBar from "./components/PopupAppBar/PopupAppBar";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import override from "./overrides";
import style from "./styles";

const Popup = props => {
  const [data, setData] = useState(props.data.pandas);
  const [cycling, setCycling] = useState(props.cycling);
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
    var port = browser.runtime.connect({ name: "pm_port" });
    port.onMessage.addListener(res => {
      setData(res);
    });
    return () => {
      port.onMessage.removeListener();
    };
  }, []);

  const handleCycleChange = () => {
    sendToBackground(messages.cycle, {})
      .then(res => {
        setCycling(res);
      })
      .catch(() => setCycling(false));
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className={classes.root}>
        <PopupAppBar />
        <List>
          <ListItem dense={true}>
            <ListItemText primary={"Cycle"} />
            <ListItemSecondaryAction>
              <Switch checked={cycling} onChange={handleCycleChange} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        <List className={classes.pandas}>
          {data.map(item => (
            <ListItem selected={item.selected} dense={true}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </ThemeProvider>
  );
};

export default Popup;
