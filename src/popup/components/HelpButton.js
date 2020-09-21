import React from "react";

import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const HelpButton = () => {
  return (
    <Tooltip title={"Open help"}>
      <IconButton
        variant="contained"
        color="secondary"
        onClick={() => {
          sendToBackground(messages.openDocs, 1);
        }}
        aria-label="close"
      >
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
};
export default HelpButton;
