import React from "react";

import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import BackupPanel from "./BackupPanel";
import Issues from "./Issues";

import { useTheme, makeStyles } from "@material-ui/core/styles";

import { version } from "manifest";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    flexDirection: "column"
  },
  pos: {
    marginBottom: 12
  },
  logo: {}
});

export default function General() {
  const theme = useTheme();
  const dark = theme.palette.type === "dark";
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.logoCard}>
        <CardHeader
          avatar={
            <Avatar
              variant="square"
              alt="Logo"
              src={dark ? "/img/icon.png" : "/img/icon_white.png"}
            />
          }
          title="Panda Manager"
          subheader={version}
        />
      </Card>
      <List>
        <Issues />
        <BackupPanel />
      </List>
    </div>
  );
}
