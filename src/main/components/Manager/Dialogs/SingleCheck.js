import React from "react";

import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const SingleCheck = props => {
  const handleSingleChange = props.func;
  const { value, classes } = props.data;

  return (
    <Paper component="form" className={classes.root} elevation={0} square>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleSingleChange}
            name="singelCheck"
          />
        }
        label="Single"
      />
    </Paper>
  );
};
export default SingleCheck;
