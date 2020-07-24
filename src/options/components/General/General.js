import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

import BackupPanel from "./BackupPanel";

import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: "flex",
    flexDirection: "column"
  },
  pos: {
    marginBottom: 12
  },
  logo: { }
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
              src={dark ? "/img/icon.png" : "/img/icon_light.png"}
            />
          }
          title="Panda Manager"
          subheader="v1.0.3"
        />
      </Card>
      <BackupPanel />
    </div>
  );
}
