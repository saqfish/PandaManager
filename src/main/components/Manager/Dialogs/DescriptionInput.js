import React from "react";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

import DescriptionIcon from "@material-ui/icons/Subject";

const DescriptionInput = props => {
  const handleDescriptionChange = props.func;
  const {value, classes} = props.data;

  return (
    <Paper component="form" className={classes.root} elevation={0} square>
      <DescriptionIcon />
      <InputBase
        className={classes.input}
        placeholder="Description"
        value={value}
        onChange={handleDescriptionChange}
        inputProps={{ "aria-label": "descrtiption" }}
      />
    </Paper>
  );
};
export default DescriptionInput;
