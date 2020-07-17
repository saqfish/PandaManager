import React from "react";

import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import CloseIcon from "@material-ui/icons/Clear";
import RequesterIcon from "@material-ui/icons/AccountBox";
import LinkIcon from "@material-ui/icons/Link";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { messageDialogStyles } from "./styles";

const AddDialog = props => {
  const { data: message } = props;
  const { func: close } = props;

  const DialogButton = withStyles(messageDialogStyles.closeButton)(Button);
  const DialogCardActions = withStyles(messageDialogStyles.cardActions)(
    CardActions
  );

  const useStyles = makeStyles(messageDialogStyles.msgInput);
  const classes = useStyles();

  return message == null ? null : (
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
            inputProps={{ "aria-label": "panda link" }}
          />
        </Paper>
      </CardContent>
      <DialogCardActions>
        <DialogButton
          onClick={() => console.log('')}
          aria-label="close"
        >
          Add
        </DialogButton>
      </DialogCardActions>
    </Card>
  );
};
export default AddDialog;
