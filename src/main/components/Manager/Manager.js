import React, { useEffect, useRef, useState } from "react";

import ManagerTable from "./ManagerTable";
import { managerContext } from "./context";

import * as browser from "webextension-polyfill";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const Manager = props => {
  const [cycling, setCycling] = useState(props.cycling);
  const [list, setList] = useState(props.data.pandas);
  const [delays, setDelays] = useState(props.data.delays);

  const loadedRef = useRef(false);

  const updateDelays = items => {
    setDelays(items);
  };

  const addToList = item => {
    setList(prev => [
      ...prev,
      {
        ...item,
        tableData: { id: list.length }
      }
    ]);
  };

  const removeFromList = item =>
    setList(prev => prev.filter(value => value != item));

  const updateInList = (oldItem, newItem) => {
    setList(prev =>
      prev.map((value, index) =>
        index == oldItem.tableData.id
          ? { ...newItem, tableData: { id: oldItem.tableData.id } }
          : value
      )
    );
  };

  const sendList = values =>
    sendToBackground(messages.setSettingsValues, { pandas: values });

  const sendDelays = values =>
    sendToBackground(messages.setSettingsValues, { delays: values });

  useEffect(() => {
    if (loadedRef.current) {
      sendList(list);
      sendDelays(delays);
    } else {
      loadedRef.current = true;
    }
  }, [list, delays]);

  useEffect(() => {
    var port = browser.runtime.connect({ name: "pm_port" });
    port.onMessage.addListener(res => {
      setList(res);
    });
    return () => {
      port.onMessage.removeListener();
    };
  }, []);

  return (
    <managerContext.Provider
      value={{
        cycling,
        list,
        delays,
        setCycling,
        addToList,
        removeFromList,
        updateInList,
        updateDelays
      }}
    >
      <ManagerTable />
    </managerContext.Provider>
  );
};

export default Manager;
