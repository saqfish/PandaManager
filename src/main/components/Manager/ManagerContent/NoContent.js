import React from "react";

import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import DoneIcon from "@material-ui/icons/Done";

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
        <ListItem>
          <ListItemAvatar>
            <DoneIcon />
          </ListItemAvatar>
          <ListItemText
            primary={"Custom Audio"}
            secondary="A custom audio can be added under Audios in the settings menu"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default NoContent;
