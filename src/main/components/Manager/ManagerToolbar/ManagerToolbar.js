import React, { useState, useContext, useRef } from "react";

import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";

import DelayInput from "./DelayInput";
import { makeStyles } from "@material-ui/core/styles";

import { DelayContext } from "../context";
import style from "./styles";

const ManagerToolbar = () => {
  const { delays: cDelays, updateDelays } = useContext(DelayContext);

  const [delays, setDelays] = useState(cDelays);
  const delaysRef = useRef(delays);

  const useStyles = makeStyles(style);
  const classes = useStyles();

  const handleDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, cycle: temp }));
  };

  console.log(delays);

  return (
    <div className={classes.container}>
      <Toolbar variant="dense">
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
      </Toolbar>
      <Divider />
    </div>
  );
};
export default ManagerToolbar;
