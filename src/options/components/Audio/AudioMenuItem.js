import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import { views } from "optionsConstants";

const AudioMenuItem = props => {
  return (
    <ListItem
      dense={true}
      button
      onClick={() => {
        props.func(views.AUDIO);
      }}
    >
      <ListItemIcon>
        <VolumeUpIcon />
      </ListItemIcon>
      <ListItemText primary="Audio" />
    </ListItem>
  );
};

export default AudioMenuItem;
