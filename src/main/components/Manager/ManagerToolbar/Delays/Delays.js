import React, { useState, useContext, useRef } from "react";

import Button from "@material-ui/core/Button";

import DelayInput from "./DelayInput";
import PreDelayInput from "./PreDelayInput";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { DelayContext } from "../../context";
import style from "./styles";

const Delays = () => {
  const { delays: cDelays, updateDelays } = useContext(DelayContext);

  const [delays, setDelays] = useState(cDelays);
  const delaysRef = useRef(delays);

  const isDark = useTheme().palette.type == "dark";
  const useStyles = makeStyles(style(isDark));
  const classes = useStyles();

  const handleDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, cycle: temp }));
  };
  const handlePreDelayChange = event => {
    const temp = event.target.value;
    setDelays(prev => ({ ...prev, pre: temp }));
  };

  return (
    <>
      <DelayInput
        data={{ value: delays.cycle, classes }}
        func={handleDelayChange}
      />
      <PreDelayInput
        data={{ value: delays.pre, classes }}
        func={handlePreDelayChange}
      />
      <Button
        disabled={delays == delaysRef.current}
        variant="contained"
        color="primary"
        onClick={() => {
          updateDelays(delays);
          delaysRef.current = delays;
        }}
        aria-label="close"
        disableElevation
      >
        Update
      </Button>
    </>
  );
};
export default Delays;
