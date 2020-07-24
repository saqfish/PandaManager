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
      <Toolbar className={classes.toolbarStyle} variant="dense">
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
        <div className={classes.toolbarButtons}>
          <IconButton
            className={classes.cycleButton}
            onClick={() =>
              sendToBackground(messages.cycle, {single: false})
                .then(res => {
                  setCycling(res);
                })
                .catch(() => setCycling(false))
            }
            disableElevation
          >
            {cycling ? <StopButton /> : <PlayButton />}
          </IconButton>
          <IconButton
            disabled={cycling}
            className={classes.addButton}
            onClick={() => setDialog({ open: true, type: 1 })}
            disableElevation
          >
            <AddButton />
          </IconButton>
          <Tooltip title="More">
            <IconButton
              className={classes.expandButton}
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
