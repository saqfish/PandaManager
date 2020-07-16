import React, { useContext } from "react";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { views } from "mainConstants";

import { ViewContext } from "mainContext";

import { Timeline, ExpandMore, ExpandLess } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  toolbarStyle: {
    flex: 0,
    color: "white",
    backgroundColor: theme.palette.type == "dark" ? "#121212" : "#3f51b5"
  },
  navigationStyle: {
    marginRight: theme.spacing(2)
  },
  toolbarButtons: {},
  title: {
    paddingLeft: 12,
    flexGrow: 1
  }
}));

const ListsAppBar = props => {
  const { data, func } = props;
  const { setBottomBarVisible } = func;
  const { title, bottomBarVisible } = data;

  const { setView } = useContext(ViewContext);

  const classes = useStyles();
  return (
    <Toolbar className={classes.toolbarStyle} variant="dense">
      <Typography className={classes.title} variant="h6" color="inherit">
        {title}
      </Typography>
      <div className={classes.toolbarButtons}>
        <Tooltip title="Hits">
          <IconButton onClick={() => setView(views.LOG)}>
            <Timeline />
          </IconButton>
        </Tooltip>

        <Tooltip title="More">
          <IconButton
            onClick={() => setBottomBarVisible(!bottomBarVisible)}
          >
            {bottomBarVisible ? <ExpandMore /> : <ExpandLess />}
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

export default ListsAppBar;
