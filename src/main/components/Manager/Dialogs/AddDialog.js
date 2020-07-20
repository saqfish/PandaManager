import React, { useState, useContext } from "react";

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

import { managerContext } from "../context";
import { messageDialogStyles } from "./styles";

const AddDialog = props => {
  const close = props.func;

  const { addToList } = useContext(managerContext);

  const [item, setItem] = useState({
    name: "",
    link: "",
    single: false,
    enabled: true
  });

  const DialogCardActions = withStyles(messageDialogStyles.cardActions)(
    CardActions
  );

  const useStyles = makeStyles(messageDialogStyles.msgInput);
  const classes = useStyles();

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
      </CardContent>
      <DialogCardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addToList(item);
            close();
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
