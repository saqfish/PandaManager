import React, { useRef } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import BackupIcon from "@material-ui/icons/Backup";
import LoadIcon from "@material-ui/icons/Publish";
import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from "@material-ui/core/styles";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20
  },
  pos: {
    marginBottom: 12
  },
  logo: {
    width: 312,
    height: 82
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const BackupPanel = () => {
  const classes = useStyles();

  const inputRef = useRef(null);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader avatar={<BackupIcon />} title="Backup" />
        <CardActions>
          <Button
            className={classes.button}
            onClick={() => {
              inputRef.current.click();
            }}
            startIcon={<LoadIcon />}
          >
            Load
          </Button>
          <Button
            className={classes.button}
            onClick={() => {
              sendToBackground(messages.backup, { load: false });
            }}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </CardActions>
      </Card>

      <input
        crossOrigin="anonymous"
        type="file"
        id="file"
        ref={inputRef}
        onChange={e => {
          let file = e.target.files[0];
          let reader = new FileReader();

          reader.onloadend = function() {
            var backupData = reader.result.replace(/^data:.+;base64,/, "");
            sendToBackground(messages.backup, { load: true, backupData });
          };

          reader.readAsDataURL(file);
        }}
        style={{ display: "none" }}
      />
    </>
  );
};

export default BackupPanel;
