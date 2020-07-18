import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CloseIcon from "@material-ui/icons/Clear";
import RequesterIcon from "@material-ui/icons/AccountBox";
import LinkIcon from "@material-ui/icons/Link";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { messageDialogStyles } from "./styles";

const AddDialog = props => {
  const { onDialogClose: close, addToList } = props.func;

  const [item, setItem] = useState({ name: "", link: "" });

  const DialogButton = withStyles(messageDialogStyles.closeButton)(Button);
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
  const handleSingleChange = value =>
    setItem(prev => ({ ...prev, single: value }));

  return (
    <Card>
      <CardHeader
        disableTypography={true}
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
        <Paper component="form" className={classes.root} elevation={0} square>
          <IconButton className={classes.iconButton} aria-label="menu">
            <RequesterIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Requester Name"
            value={item.name}
            onChange={handleRequesterNameChange}
            inputProps={{ "aria-label": "requester name" }}
          />
        </Paper>
        <Paper component="form" className={classes.root} elevation={0} square>
          <IconButton className={classes.iconButton} aria-label="menu">
            <LinkIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Panda Link"
            value={item.link}
            onChange={handlePandaLinkChange}
            inputProps={{ "aria-label": "panda link" }}
          />
        </Paper>
        <Paper component="form" className={classes.root} elevation={0} square>
          <IconButton className={classes.iconButton} aria-label="menu">
            <LinkIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Description"
            value={item.description}
            onChange={handleDescriptionChange}
            inputProps={{ "aria-label": "description" }}
          />
        </Paper>
        <Paper component="form" className={classes.root} elevation={0} square>
          <FormControlLabel
            control={
              <Checkbox
                checked={item.single}
                onChange={handleSingleChange}
                name="singelCheck"
              />
            }
            label="Single"
          />
        </Paper>
      </CardContent>
      <DialogCardActions>
        <DialogButton
          onClick={() => {
            addToList(item);
            close();
          }}
          aria-label="close"
        >
          Add
        </DialogButton>
      </DialogCardActions>
    </Card>
  );
};
export default AddDialog;
