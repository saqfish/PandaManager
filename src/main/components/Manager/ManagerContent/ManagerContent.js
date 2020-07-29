import React, { useContext } from "react";

import Paper from "@material-ui/core/Paper";

import PandaCard from "../PandaCard/PandaCard";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import { ListContext } from "../context";
import style from "./styles";

const ManagerContent = () => {
  const { list, id, showDetails } = useContext(ListContext);

  const isDark = useTheme().palette.type == "dark";
  const useStyles = makeStyles(style(isDark));
  const classes = useStyles();

  return (
    <Paper className={classes.container} elevation={0} square>
      {list.map((data, i) => (
        <PandaCard data={data} single={id==i} func={showDetails} />
      ))}
    </Paper>
  );
};

export default ManagerContent;
