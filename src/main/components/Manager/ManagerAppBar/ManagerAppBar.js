import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { ExpandMore, ExpandLess } from "@material-ui/icons";
import AddButton from "@material-ui/icons/PostAdd";
import PlayButton from "@material-ui/icons/PlayArrow";
import StopButton from "@material-ui/icons/Stop";

import { makeStyles } from "@material-ui/core/styles";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import style from "./styles";

const useStyles = makeStyles(theme => style(theme));

const ManagerAppBar = props => {
  const { data, func } = props;
  const { setDialog, setCycling, setBottomBarVisible } = func;
  const { title, cycling, bottomBarVisible } = data;

  const classes = useStyles();

  return (
    <AppBar elevation={0} position="static">
      <Toolbar className={classes.toolbar} variant="dense">
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
        <div className={classes.buttons}>
          <Tooltip title={cycling ? "Stop" : "Start"}>
            <IconButton
              className={classes.cycle}
              onClick={() =>
                sendToBackground(messages.cycle, { single: false })
                  .then(res => {
                    setCycling(res);
                  })
                  .catch(() => setCycling(false))
              }
              disableElevation
            >
              {cycling ? <StopButton /> : <PlayButton />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Add">
            <IconButton
              disabled={cycling}
              className={classes.add}
              onClick={() => setDialog({ open: true, type: 1 })}
              disableElevation
            >
              <AddButton />
            </IconButton>
          </Tooltip>
          <Tooltip title={bottomBarVisible ? "Less" : "More"}>
            <IconButton
              className={classes.expand}
              onClick={() => setBottomBarVisible(!bottomBarVisible)}
            >
              {bottomBarVisible ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ManagerAppBar;
