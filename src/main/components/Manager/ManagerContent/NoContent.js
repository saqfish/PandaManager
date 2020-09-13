import React from "react";

import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";
import BugIcon from "@material-ui/icons/BugReport";

import { useTheme } from "@material-ui/core/styles";
import { version } from "manifest";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const NoContent = () => {
  const theme = useTheme();
  const dark = theme.palette.type === "dark"; //eslint-disable-line
  return (
    <Box p={2} width={1}>
      <Box m={2} fontSize="h5.fontSize">
        What's new in {version}
      </Box>
      <List dense={true}>
        <ListItem>
          <ListItemAvatar>
            <DoneIcon />
          </ListItemAvatar>
          <ListItemText
            primary={"PRE delay"}
            secondary="A delay can be set to avoid constant PRE errors"
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <BugIcon />
          </ListItemAvatar>
          <ListItemText
            primary={"UI/Bug"}
            secondary="General UI & Bug fixes"
          />
        </ListItem>
      </List>
      <Box m={2} fontSize="h5.fontSize">
        HitForker
      </Box>
      <List dense={true}>
        <ListItem>
          <ListItemAvatar>
            <DoneIcon />
          </ListItemAvatar>
          <ListItemText
            primary={"HitForker Integration"}
            secondary="This feature works only with the custom Hit Forker script provided"
          />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              color="primary"
              l={1}
              onClick={() =>
                sendToBackground(
                  messages.openPage,
                  "https://github.com/saqfish/Hit-Forker-PM"
                )
              }
              disableElevation
            >
              Get Hit Forker
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Box>
  );
};

export default NoContent;
