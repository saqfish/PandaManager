import React, { useEffect, useState } from "react";

import * as browser from "webextension-polyfill";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import AppBarView from "./components/AppBar/AppBarView.js";
import DrawerView from "./components/Drawer/DrawerView.js";
import General from "./components/General/General";
import Audio from "./components/Audio/Audio";
import Appearance from "./components/Appearance/Appearance";

import { optionsContext } from "optionsContext";

import { views } from "optionsConstants";

import { makeStyles } from "@material-ui/core/styles";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { messages } from "constants";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const Options = props => {
  const [settings, setSettings] = useState(props.data);
  const reload = () =>
    browser.runtime
      .sendMessage({ type: messages.initOptions, data: {} })
      .then(res => {
        setSettings(res.values);
      });

  useEffect(() => {
    props.func(messages.setSettingsValues, settings);
  }, [settings]);

  const [view, setView] = useState(0);

  const theme = createMuiTheme(settings.theme);

  const RenderView = () => {
    let SelectedItem = <General />;
    switch (view) {
      case views.GENERAL:
        SelectedItem = <General />;
        break;
      case views.APPEARANCE:
        SelectedItem = <Appearance />;
        break;
      case views.AUDIO:
        SelectedItem = <Audio />;
        break;
    }
    return SelectedItem;
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <optionsContext.Provider value={[settings, setSettings]}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBarView func={props.func} />
          <DrawerView func={setView} />
          <div className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
              <RenderView data={{settings}} func={reload} />
            </Typography>
          </div>
        </ThemeProvider>
      </optionsContext.Provider>
    </div>
  );
};
export default Options;
