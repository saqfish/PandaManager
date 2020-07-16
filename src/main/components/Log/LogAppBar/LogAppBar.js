import React, { useContext } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { views } from "mainConstants";

import { ViewContext } from "mainContext";

import { Timeline } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";

import style from './styles';

const useStyles = makeStyles(theme => (style(theme)));

const ListsAppBar = props => {
  const { data } = props;
  const { title } = data;

  const { setView } = useContext(ViewContext);

  const classes = useStyles();
  return (
    <AppBar elevation={0} position="static">
      <Toolbar className={classes.toolbarStyle} variant="dense">
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
        <div className={classes.toolbarButtons}>
          <Tooltip title="Pandas">
            <IconButton onClick={() => setView(views.LIST)}>
              <Timeline />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ListsAppBar;
