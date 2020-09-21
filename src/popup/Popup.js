import React, { useEffect, useState} from "react";

import * as browser from "webextension-polyfill";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import PopupAppBar from "./components/PopupAppBar/PopupAppBar";
import HelpButton from "./components/HelpButton";
import Empty from "./components/Empty";

import DelayInput from "./components/DelayInput";
import PreDelayInput from "./components/PreDelayInput";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import override from "./overrides";
import style from "./styles";

const Popup = props => {
  const [delays, setDelays] = useState(props.data.delays);
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
      const { cycling, pandas } = res;
      setCycling(cycling);
      setData(pandas);
    });
    return () => {
      port.onMessage.removeListener();
    };
  }, []);


  const updateDelays = () =>
    sendToBackground(messages.setSettingsValues, { delays });

  const handleCycleChange = () => {
    updateDelays();
    sendToBackground(messages.cycle, {})
      .then(res => {
        setCycling(res);
      })
      .catch(() => setCycling(false));
  };

  const handleEnabledChange = id => {
    const pandas = [...data];
    pandas[id].enabled = !pandas[id].enabled;
    sendToBackground(messages.setSettingsValues, { pandas }).then(res =>
      setData(res.pandas)
    );
  };
  const handleDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, cycle: temp }));
  };
  const handlePreDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, pre: temp }));
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <div className={classes.root}>
        {data.length > 0 ? (
          <>
            <PopupAppBar />
            <List>
              <ListItem classes={{ root: classes.cycle }} dense={true}>
                <DelayInput
                  data={{ value: delays.cycle, classes, disabled: cycling }}
                  func={handleDelayChange}
                />
                <PreDelayInput
                  data={{ value: delays.pre, classes, disabled: cycling }}
                  func={handlePreDelayChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCycleChange}
                  disableElevation
                >
                  {cycling ? "Stop" : "Start"}
                </Button>
                <HelpButton/>
              </ListItem>
            </List>
            <Divider />
            <List className={classes.list}>
              {data.map((item, i) => (
                <ListItem selected={item.selected && item.enabled} dense={true}>
                  <ListItemAvatar>
                    <Avatar
                      classes={{ root: classes.avatar }}
                      variant="square"
                      aria-label="accepted"
                    >
                      {item.accepted}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      item.name
                        ? item.name
                        : item.link.match(
                          /^https:\/\/worker.mturk.com\/projects\/(.{30})\/tasks(\/accept_random|)\?ref=w_pl_prvw$/
                        )[1]
                    }
                  />
                  <ListItemSecondaryAction className={classes.actions}>
                    <Tooltip title={item.enabled ? "Disable" : "Enable"}>
                      <Switch
                        checked={item.enabled}
                        color="primary"
                        onChange={() => handleEnabledChange(i)}
                      />
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>{" "}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </ThemeProvider>
  );
};

export default Popup;
