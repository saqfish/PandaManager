import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

import DelayIcon from "@material-ui/icons/AccessTime";

const PreDelayInput = props => {
  const handleDelayChange = props.func;
  const { value, classes, disabled } = props.data;

  return (
    <Paper component="form" className={classes.preDelayForm} elevation={0}>
      <DelayIcon />
      <Tooltip title={"Pre Delay"}>
        <InputBase
          className={classes.input}
          placeholder="1000"
          value={value}
          onChange={handleDelayChange}
          inputProps={{ "aria-label": "PRE Delay" }}
          disabled={disabled}
        />
      </Tooltip>
    </Paper>
  );
};
export default PreDelayInput;
