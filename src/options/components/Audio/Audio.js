import React, { useRef, useContext } from "react";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import { optionsContext } from "optionsContext";

const Audio = () => {
  const [settings, setSettings] = useContext(optionsContext);
  const audios = [1, 2, 3, 4];
  const inputFile = useRef(null);

  const handleAudioChange = value => {
    setSettings(prev => ({ ...prev, beep: value }));
  };

  return (
    <>
      <List
        subheader={
          <ListSubheader component="div" id="builtin-audios">
            Packaged audios
          </ListSubheader>
        }
      >
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
        <ListItem selected={5 == settings.beep}>
          <ListItemText primary={`Custom audio`} />
          <ListItemSecondaryAction>
            <Button
              variant="contained"
              color="primary"
              onClick={() => inputFile.current.click()}
              aria-label="load audio"
            >
              Load
            </Button>
            {settings.customAudio ? (
              <Button
                variant="contained"
                color="primary"
                disabled={5 == settings.beep}
                edge="end"
                onClick={() => handleAudioChange(5)}
                aria-label="load audio"
              >
                Select
              </Button>
            ) : null}
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <input
        crossOrigin="anonymous"
        type="file"
        id="file"
        ref={inputFile}
        onChange={e => {
          console.log(e.target.files[0]);
          let file = e.target.files[0];
          let reader = new FileReader();

          reader.onloadend = function() {
            var b64 = reader.result.replace(/^data:.+;base64,/, "");
            setSettings(prev => ({ ...prev, customAudio: b64 }));
            handleAudioChange(5);
          };

          reader.readAsDataURL(file);
        }}
        style={{ display: "none" }}
      />
    </>
  );
};

export default Audio;
