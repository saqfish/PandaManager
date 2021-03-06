import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

import DelayIcon from "@material-ui/icons/AccessTime";

const DelayInput = props => {
  const handleDelayChange = props.func;
  const { value, classes, disabled } = props.data;

  return (
    <Paper component="form" className={classes.delayForm} elevation={0}>
      <DelayIcon />
      <Tooltip title={"Panda Delay"}>
        <InputBase
          className={classes.input}
          placeholder="Delay"
          value={value}
          onChange={handleDelayChange}
          inputProps={{ "aria-label": "Delay" }}
          disabled={disabled}
        />
      </Tooltip>
    </Paper>
  );
};
export default DelayInput;
