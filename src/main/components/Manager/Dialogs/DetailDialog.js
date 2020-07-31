import React, { useRef, useContext, useState } from "react";

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
import SingleCheck from "./SingleCheck";
import EnabledCheck from "./EnabledCheck";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { ListContext } from "../context";
import { messageDialogStyles } from "./styles";

const DetailDialog = props => {
  const close = props.close;
  const [item, setItem] = useState(props.data.item);
  const id = props.data.id;
  const { updateInList } = useContext(ListContext);

  const oldItem = useRef(item);

  const DialogCardActions = withStyles(messageDialogStyles.cardActions)(
    CardActions
  );

  const errors = { empty: "Fields cannot be empty", link: "Invalid link" };

  const useStyles = makeStyles(messageDialogStyles.msgInput);
  const classes = useStyles();
  const [error, setError] = useState();

  const validateItems = () => {
    if (
      item.name.length < 1 ||
      item.link.length < 1 ||
      item.description.length < 1
    ) {
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
  const handleSingleChange = event =>
    setItem(prev => ({ ...prev, single: event.target.checked }));
  const handleEnbledChange = event =>
    setItem(prev => ({ ...prev, enabled: event.target.checked }));

  return (
    <Card>
      <CardHeader
        title="Panda Detail"
        action={
          <IconButton
            aria-label="close"
            onClick={() => close()}
            classes={{ root: classes.deleteButton }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <RequesterInput
          data={{ value: item.name, classes }}
          func={handleRequesterNameChange}
        />
        <PandaLinkInput
          data={{ value: item.link, classes }}
          func={handlePandaLinkChange}
        />
        <DescriptionInput
          data={{ value: item.description, classes }}
          func={handleDescriptionChange}
        />
        <SingleCheck
          data={{ value: item.single, classes }}
          func={handleSingleChange}
        />
        <EnabledCheck
          data={{ value: item.enabled, classes }}
          func={handleEnbledChange}
        />
        {error ? <Alert severity="error">{error}</Alert> : null}
      </CardContent>
      <DialogCardActions>
        <Button
          disabled={item == oldItem.current}
          variant="contained"
          color="primary"
          onClick={() => {
            if (validateItems()) {
              updateInList(id, item);
              close();
            }
          }}
          aria-label="close"
          disableElevation
        >
          Update
        </Button>
      </DialogCardActions>
    </Card>
  );
};
export default DetailDialog;
