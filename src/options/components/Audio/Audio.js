import React, { useState, useContext } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { makeStyles } from "@material-ui/core/styles";

import style from "./styles";

import { optionsContext } from "optionsContext";

const useStyles = makeStyles(style);

const Audio = () => {
  const [settings, setSettings] = useContext(optionsContext);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const audios = [1, 2, 3, 4];

  const handleAudioChange = value => {
    setSettings(prev => ({ ...prev, beep: value }));
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        <ListItem button onClick={() => setOpen(!open)}>
          <ListItemText
            primary="Alarm audio"
            secondary={`Audio ${settings.beep}`}
          />
        </ListItem>
      </List>
      <Dialog
        onClose={handleClose}
        aria-labelledby="audio-number-dialog"
        open={open}
      >
        <DialogTitle id="audio-number-dialog-title">Select Audio</DialogTitle>
        <List>
          {audios.map(number => (
            <ListItem
              key={number}
              selected={number == settings.beep}
              button
              onClick={() => handleAudioChange(number)}
            >
              <ListItemText primary={`Audio ${number}`} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
};

export default Audio;
