import React, { useContext } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Clear";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import { ListContext } from "../context";
import { container, cardStyles } from "./styles";

const PandaCard = props => {
  const data = props.data;
  const single = props.single;
  const showDetails = props.func;
  const { cycling, setCycling, updateInList, removeFromList } = useContext(
    ListContext
  );

  const isDark = useTheme().palette.type == "dark";
  const useStyles = makeStyles(cardStyles(isDark, data.enabled, data.selected));

  const classes = useStyles();

  console.log(single);

  return (
    <div style={container}>
      <Card classes={{ root: classes.root }}>
        <CardHeader
          avatar={
            <Avatar variant="square" aria-label="timer">
              {data.accepted}
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
          subheader={
            data.link.match(
              /^https:\/\/worker.mturk.com\/projects\/(.{30})\/tasks(\/accept_random|)\?ref=w_pl_prvw$/
            )[1]
          }
          classes={{ title: classes.title, subheader: classes.subheader }}
        />
        <CardContent classes={{ root: classes.description }}>
          {data.description}
        </CardContent>
        <CardActions>
          <Button
            disabled={cycling && !single}
            variant="contained"
            color={isDark ? "primary" : "default"}
            onClick={() =>
              sendToBackground(messages.cycle, {
                single: true,
                id: data.tableData.id
              })
                .then(res => {
                  setCycling(res);
                })
                .catch(() => setCycling(false))
            }
            disableElevation
          >
            {cycling && single ? "Stop" : "Start"}
          </Button>
          <Button
            disabled={cycling}
            variant="contained"
            color={isDark ? "primary" : "default"}
            onClick={() => showDetails(data)}
            disableElevation
          >
            Details
          </Button>
          <Switch
            onChange={event => {
              updateInList(data, { ...data, enabled: event.target.checked });
            }}
            checked={data.enabled}
            color={isDark ? "primary" : "default"}
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default PandaCard;
