import React from "react";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

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
  logoCard: {
    width: 380,
    height: 120
  },
  logo: {
    width: 312,
    height: 82,
    margin: "20px 10px 10px 20px"
  }
});

export default function General() {
  const theme = useTheme();
  const dark = theme.palette.type === "dark";
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.logoCard}>
        <CardMedia
          className={classes.logo}
          image={dark ? "/img/logo_light.png" : "/img/logo.png"}
          title="Panda Manager"
        />
      </Card>
      <BackupPanel />
    </div>
  );
}
