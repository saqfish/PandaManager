import React, { useContext } from "react";

import Paper from "@material-ui/core/Paper";

import PandaCard from "../PandaCard/PandaCard";

import { ListContext } from "../context";
import { containerStyle, cardContainerStyle } from "./styles";

const ManagerContent = () => {

  const { list, showDetails } = useContext(ListContext);

  return (
    <Paper style={containerStyle}>
      <div style={cardContainerStyle}>
        {list.map(data => (
          <PandaCard data={data} func={showDetails} />
        ))}
      </div>
    </Paper>
  );
};

export default ManagerContent;
