import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { ExpandMore, ExpandLess } from "@material-ui/icons";
import AddButton from "@material-ui/icons/PostAdd";

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

const ManagerAppBar = props => {
  const { data, func } = props;
  const { setBottomBarVisible, setDialog } = func;
  const { title, bottomBarVisible } = data;

  const classes = useStyles();
  return (
    <AppBar elevation={0} position="static">
      <Toolbar className={classes.toolbarStyle} variant="dense">
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
        <div className={classes.toolbarButtons}>
          <IconButton
            onClick={() => setDialog({ open: true, type: 1 })}
            disableElevation
          >
            <AddButton />
          </IconButton>
          <Tooltip title="More">
            <IconButton onClick={() => setBottomBarVisible(!bottomBarVisible)}>
              {bottomBarVisible ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ManagerAppBar;
