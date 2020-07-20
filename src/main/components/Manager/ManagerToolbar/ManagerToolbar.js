import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import DelayInput from "./DelayInput";
import { makeStyles } from "@material-ui/core/styles";

import { messageDialogStyles } from "./styles";

const ManagerToolbar = props => {
  const { updateDelays } = props.func;

  const [delays, setDelays] = useState(props.data);

  const useStyles = makeStyles(messageDialogStyles.msgInput);
  const classes = useStyles();

  const handleDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, cycle: temp}));
  };

  return (
    <>
      <DelayInput
        data={{ value: delays.cycle, classes }}
        func={handleDelayChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          updateDelays(delays);
        }}
        aria-label="close"
        disableElevation
      >
        Update
      </Button>
    </>
  );
};
export default ManagerToolbar;
