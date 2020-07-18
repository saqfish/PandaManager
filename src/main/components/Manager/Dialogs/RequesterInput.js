import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import RequesterIcon from "@material-ui/icons/AccountBox";

const RequesterInput = props => {
  const handleRequesterNameChange = props.func;
  const {value, classes} = props.data;

  return (
    <Paper component="form" className={classes.root} elevation={0} square>
      <RequesterIcon />
      <InputBase
        className={classes.input}
        placeholder="Requester Name"
        value={value}
        onChange={handleRequesterNameChange}
        inputProps={{ "aria-label": "requester name" }}
      />
    </Paper>
  );
};
export default RequesterInput;
