import React , { useContext} from "react";

import List from "@material-ui/core/List";

import { makeStyles } from "@material-ui/core/styles";

import DarkThemeListItem from "./DarkThemeListItem";
import WindowListItem from "./WindowListItem";

import { optionsContext } from "optionsContext";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  },
  inline: {
    display: "inline"
  }
}));

const Appearance = ()  => {
  const [settings, setSettings] = useContext(optionsContext);
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <DarkThemeListItem data={settings} func={setSettings} />
      <WindowListItem data={settings} func={setSettings} />
    </List>
  );
};

export default Appearance;
