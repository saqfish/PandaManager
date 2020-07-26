import React from "react";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import LaunchIcon from "@material-ui/icons/Launch";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

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
      <AppBar position="static" className={classes.toolbar}>
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            Panda Manager
          </Typography>
          <ButtonGroup
            color="primary"
            aria-label="bar buttons"
          >
            <Button
              className={classes.main}
              onClick={() => sendToBackground(messages.openPage, "main.html")}
              disableElevation
            >
              <LaunchIcon />
            </Button>
            <Button
              className={classes.settings}
              onClick={() =>
                sendToBackground(messages.openPage, "options.html")
              }
              disableElevation
            >
              <SettingsIcon />
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PopupAppBar;
