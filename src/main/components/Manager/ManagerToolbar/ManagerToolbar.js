import React, { useState, useContext, useRef } from "react";

import Button from "@material-ui/core/Button";

import DelayInput from "./DelayInput";
import { makeStyles } from "@material-ui/core/styles";

import { managerContext } from "../context";
import style from "./styles";

const ManagerToolbar = () => {
  const { delays: cDelays, updateDelays } = useContext(managerContext);

  const [delays, setDelays] = useState(cDelays);
  const delaysRef = useRef(delays);

  const useStyles = makeStyles(style);
  const classes = useStyles();

  const handleDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, cycle: temp }));
  };

  return (
    <div className={classes.container}>
      <DelayInput
        data={{ value: delays.cycle, classes }}
        func={handleDelayChange}
      />
      <Button
        disabled={delays == delaysRef.current}
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
    </div>
  );
};
export default ManagerToolbar;
