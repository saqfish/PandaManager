import React, { useState, useContext, useRef } from "react";

import { Alert } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Clear";

import RequesterInput from "./RequesterInput";
import PandaLinkInput from "./PandaLinkInput";
import DescriptionInput from "./DescriptionInput";
import AlarmCheck from "./AlarmCheck";
import EnabledCheck from "./EnabledCheck";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { ListContext } from "../context";
import { messageDialogStyles } from "./styles";

const AddDialog = props => {
  const close = props.close;

  const { addToList } = useContext(ListContext);

  const [item, setItem] = useState({
    name: "",
    link: "",
    accepted: 0,
    description: "",
    alarm: true,
    enabled: true
  });

  const dialogRef = useRef(item);

  const DialogCardActions = withStyles(messageDialogStyles.cardActions)(
    CardActions
  );

  const errors = { empty: "Link field cannot be empty", link: "Invalid link" };

  const useStyles = makeStyles(messageDialogStyles.msgInput);
  const classes = useStyles();
  const [error, setError] = useState();

  const validateItems = () => {
    if (item.link.length < 1) {
      setError(errors.empty);
      return false;
    }
    if (
      !item.link.match(
        /^https:\/\/worker.mturk.com\/projects\/(.{30})\/tasks(\/accept_random|)\?ref=w_pl_prvw$/
      )
    ) {
      setError(errors.link);
      return false;
    }
    return true;
  };

  const handleRequesterNameChange = event =>
    setItem(prev => ({ ...prev, name: event.target.value }));
  const handlePandaLinkChange = event =>
    setItem(prev => ({ ...prev, link: event.target.value }));
  const handleDescriptionChange = event =>
    setItem(prev => ({ ...prev, description: event.target.value }));
  const handleAlarmChange = event =>
    setItem(prev => ({ ...prev, alarm: event.target.checked }));
  const handleEnbledChange = event =>
    setItem(prev => ({ ...prev, enabled: event.target.checked }));

  return (
    <Card>
      <CardHeader
        title="New Panda"
        action={
          <IconButton
            aria-label="delete"
            onClick={() => close()}
            classes={{ root: classes.deleteButton }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <PandaLinkInput
          data={{ value: item.link, classes }}
          func={handlePandaLinkChange}
        />
        <RequesterInput
          data={{ value: item.name, classes }}
          func={handleRequesterNameChange}
        />
        <DescriptionInput
          data={{ value: item.description, classes }}
          func={handleDescriptionChange}
        />
        <AlarmCheck
          data={{ value: item.alarm, classes }}
          func={handleAlarmChange}
        />
        <EnabledCheck
          data={{ value: item.enabled, classes }}
          func={handleEnbledChange}
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
      </CardContent>
      <DialogCardActions>
        <Button
          disabled={item == dialogRef.current}
          variant="contained"
          color="primary"
          onClick={() => {
            if (validateItems()) {
              addToList(item);
              close();
            }
          }}
          aria-label="close"
          disableElevation
        >
          Add
        </Button>
      </DialogCardActions>
    </Card>
  );
};
export default AddDialog;
