import React, { useRef } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

import BackupIcon from '@material-ui/icons/Backup';
import LoadIcon from '@material-ui/icons/Publish';
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles } from "@material-ui/core/styles";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  pos: {
    marginBottom: 12
  },
  logo: {
    width: 312,
    height: 82
  }
});

const BackupPanel = () => {
  const classes = useStyles();

  const inputRef = useRef(null);

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={<BackupIcon/>}
          action={
          <>
          <Button
            size="small"
            onClick={() => {
              inputRef.current.click();
            }}
          >
            <LoadIcon/>
          </Button>
          <Button
            size="small"
            onClick={() => {
              sendToBackground(messages.backup, { load: false });
            }}
          >
            <SaveIcon/>
          </Button>
          </>
          }
          title="Backup"
        />

        <CardContent>
          <Typography variant="body2" gutterBottom>
		Note: hits in your scrape list will not be backed up.
		Both your include and block lists will be backed up.	
          </Typography>
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
        </CardContent>
      </Card>
    </>
  );
};

export default BackupPanel;
