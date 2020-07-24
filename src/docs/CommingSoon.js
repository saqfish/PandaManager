import React from "react";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const CommingSoon = () => {
  const style = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)"
  };
  return (
    <div style={style}>
      <List component="span" aria-label="comming soon">
        <ListItem>
          <ListItemText primary="Documentation comming soon!" />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          sendToBackground(
            messages.openPage,
            "https://github.com/saqfish/PandaManager/issues"
          )
        }
        disableElevation
      >
        Issue Tracker
      </Button>
    </div>
  );
};

export default CommingSoon;
