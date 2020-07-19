import React from "react";

import ManagerTable from "./ManagerTable";

const Manager = props => {
  return <ManagerTable data={props.data} cycling={props.cycling} />;
};

export default Manager;
