import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

import { cardStyles } from "./styles";

const PandaCard = props => {
  const { data, cycling } = props.data;
  const { showDetails, updateInList, removeFromList } = props.func;

  const { container } = cardStyles(data.enabled, data.selected);
  const useStyles = makeStyles(cardStyles(data.enabled, data.selected));

  const classes = useStyles();

  return (
    <div style={container}>
      <Card classes={{ root: classes.root }}>
        <CardHeader
          avatar={
            <Avatar variant="square" aria-label="timer">
              {data.single ? 1 : "+"}
            </Avatar>
          }
          action={
            <IconButton
              disabled={cycling}
              onClick={() => removeFromList(data)}
              aria-label="delete"
              classes={{ root: classes.deleteButton }}
            >
              <DeleteIcon />
            </IconButton>
          }
          title={data.name}
          subheader={data.link}
          classes={{ title: classes.title, subheader: classes.subheader }}
        />
        <CardContent classes={{ root: classes.description }}>
          {data.description}
        </CardContent>
        <CardActions>
          <Button
            disabled={cycling}
            variant="contained"
            color="primary"
            disableElevation
          >
            Start
          </Button>
          <Button
            disabled={cycling}
            variant="contained"
            color="primary"
            onClick={() => showDetails(data)}
            disableElevation
          >
            Details
          </Button>
          <Switch
            disabled={cycling}
            onChange={event => {
              updateInList(data, { ...data, enabled: event.target.checked });
            }}
            checked={data.enabled}
            color="primary"
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default PandaCard;
