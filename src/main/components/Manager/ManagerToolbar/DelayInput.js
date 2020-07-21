import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import DelayIcon from "@material-ui/icons/AccessTime";

const DelayInput = props => {
  const handleDelayChange = props.func;
  const { value, classes } = props.data;

  return (
    <Paper component="form" className={classes.root} elevation={0} square>
      <DelayIcon />
      <InputBase
        className={classes.input}
        placeholder="Delay"
        value={value}
        onChange={handleDelayChange}
        inputProps={{ "aria-label": "Delay" }}
      />
    </Paper>
  );
};
export default DelayInput;
