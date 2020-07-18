import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import RequesterIcon from "@material-ui/icons/AccountBox";

const PandaLinkInput = props => {
  const handlePandaLinkChange = props.func;
  const {value, classes} = props.data;

  return (
    <Paper component="form" className={classes.root} elevation={0} square>
      <RequesterIcon />
      <InputBase
        className={classes.input}
        placeholder="Panda Link"
        value={value}
        onChange={handlePandaLinkChange}
        inputProps={{ "aria-label": "panda link" }}
      />
    </Paper>
  );
};
export default PandaLinkInput;
