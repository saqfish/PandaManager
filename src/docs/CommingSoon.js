import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const CommingSoon = () => {
  const style = {
    minHeight: "100vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: "calc(10px + 2vmin)"
  };
  return (
    <div style={style}>
      <List component="span" aria-label="comming soon">
        <ListItem>
          <ListItemText primary="Documentation comming soon!" secondary="saqfish@gmail.com" />
        </ListItem>
      </List>
    </div>
  );
};

export default CommingSoon;
