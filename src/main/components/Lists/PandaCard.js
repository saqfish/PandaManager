import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";

import { cardStyles } from "./styles";

const PandaCard = props => {
  const { data } = props;

  const { cardStyle, cardHeaderStyle } = cardStyles;

  return (
    <div style={cardStyle}>
      <Card>
        <CardHeader
          avatar={
            <Avatar variant="square" aria-label="timer">
              1
            </Avatar>
          }
          title={data.name}
          subheader={data.metadata != undefined ? data.metadata : null}
          classes={{ title: cardHeaderStyle }}
        />
        <CardActions>
          <Button size="small">Start</Button>
          <Button size="small">Details</Button>
          <Switch checked={true} color="primary" />
        </CardActions>
      </Card>
    </div>
  );
};

export default PandaCard;
