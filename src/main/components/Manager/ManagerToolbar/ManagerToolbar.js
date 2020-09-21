import React from "react";

import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";

import Delays from "./Delays/Delays";
import HelpButton from "./HelpButton";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import style from "./styles";

const ManagerToolbar = () => {
  const isDark = useTheme().palette.type == "dark";
  const useStyles = makeStyles(style(isDark));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Toolbar variant="dense">
        <Delays />
        <HelpButton />
      </Toolbar>
      <Divider />
    </div>
  );
};
export default ManagerToolbar;
