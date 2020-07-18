import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

import { cardStyles } from "./styles";

const PandaCard = props => {
  const { data } = props;
  const { showDetails, removeFromList } = props.func;

  const { container } = cardStyles;
  const useStyles = makeStyles(cardStyles);

  const classes = useStyles();

  return (
    <div style={container}>
      <Card classes={{ root: classes.root }}>
        <CardHeader
          avatar={
            <Avatar variant="square" aria-label="timer">
              1
            </Avatar>
          }
          action={
            <IconButton
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
        <CardActions>
          <Button size="small">Start</Button>
          <Button onClick={() => showDetails(data)} size="small">
            Details
          </Button>
          <Switch checked={true} color="primary" />
        </CardActions>
      </Card>
    </div>
  );
};

export default PandaCard;
