import React, { useRef } from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const WindowListItem = props => {
  const { data: settings, func: setSettings } = props;

  const inTabRef = useRef(null);

  const handleForegroundChange = event => {
    const value = event.target.checked;
    setDark(value);
  };

  const handleClick = () => {
    if (inTabRef.current) {
      inTabRef.current.click();
    }
  };

  const setDark = value => {
    setSettings(prev => ({
      ...prev, inTab: value
    }));
  };
  return (
    <ListItem button onClick={handleClick}>
      <ListItemText
        primary="Open in tab"
        secondary="Open Panda Manager in tabs instead of a seperate window"
      />
      <ListItemSecondaryAction>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                inputRef={inTabRef}
                checked={settings.inTab}
                onChange={handleForegroundChange}
                value={settings.inTab}
                color="primary"
              />
            }
          />
        </FormGroup>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default WindowListItem;
