import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import LaunchIcon from "@material-ui/icons/Launch";
import SettingsIcon from "@material-ui/icons/Settings";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

// import style from "./styles";

const Empty = () => {
  console.log("blah");
  return (
    <>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Welcome to Panda Manger. Once you add a panda, it'll be viewable
              in this window.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => sendToBackground(messages.openPage, "main.html")}
            color="primary"
            startIcon={<LaunchIcon />}
            disableElevation
          >
            Open Manager
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => sendToBackground(messages.openPage, "options.html")}
            color="primary"
            startIcon={<SettingsIcon />}
            disableElevation
          >
            Settings
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Empty;
