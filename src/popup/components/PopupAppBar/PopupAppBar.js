import React from "react";

import IconButton from "@material-ui/core/Button";
import LaunchIcon from "@material-ui/icons/Launch";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import style from "./styles";

const PopupAppBar = () => {
  const theme = useTheme();
  const isDark = theme.palette.type == "dark";
  const useStyles = makeStyles(() => style(isDark));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static">
        <Toolbar className={classes.toolbar} variant="dense">
          <Typography variant="h6" className={classes.title}>
            Panda Manager
          </Typography>
          <Tooltip title="Open">
            <IconButton
              className={classes.main}
              onClick={() => sendToBackground(messages.openPage, "main.html")}
              disableElevation
            >
              <LaunchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              className={classes.settings}
              onClick={() =>
                sendToBackground(messages.openPage, "options.html")
              }
              disableElevation
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PopupAppBar;
