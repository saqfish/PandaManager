import React, { useContext } from "react";

import Paper from "@material-ui/core/Paper";

import PandaCard from "../PandaCard/PandaCard";
import NoContent from "./NoContent";

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
      {list.length ? (
        list.map((data, i) => (
          <PandaCard data={data} id={i} single={id == i} func={showDetails} />
        ))
      ) : (
        <NoContent />
      )}
    </Paper>
  );
};

export default ManagerContent;
