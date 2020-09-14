import React, { useEffect, useState } from "react";

import * as browser from "webextension-polyfill";

import Dialog from "@material-ui/core/Dialog";

import ManagerAppBar from "./ManagerAppBar/ManagerAppBar";
import ManagerToolbar from "./ManagerToolbar/ManagerToolbar";
import ManagerContent from "./ManagerContent/ManagerContent";

import AddDialog from "./Dialogs/AddDialog";
import DetailDialog from "./Dialogs/DetailDialog";

import { ListContext, DelayContext } from "./context";
import { sendToBackground } from "miscUtils";
import { messages } from "constants";

const Manager = props => {
  const [list, setList] = useState(props.data.pandas);
  const [delays, setDelays] = useState(props.data.delays); 
  const [cycling, setCycling] = useState(props.cycling);
  const [id, setID] = useState(null);
  const [bottomBarVisible, setBottomBarVisible] = useState(true);
  const [dialog, setDialog] = useState({ open: false, type: null });

  const updateDelays = items => {
    setDelays(items);
    sendDelays(items);
  };

  const addToList = item => {
    let nList = [...list, { ...item }];
    sendList(nList);
  };

  const removeFromList = id => {
    let nList = [...list];
    nList.splice(id, 1);
    sendList(nList);
  };

  const updateInList = (id, newItem) => {
    let nList = list.map((item, i) => (i == id ? newItem : item));
    sendList(nList);
  };

  const sendList = values =>
    sendToBackground(messages.setSettingsValues, { pandas: values });

  const sendDelays = values =>
    sendToBackground(messages.setSettingsValues, { delays: values });

  const onDialogClose = () =>
    setDialog({ open: false, type: null, data: null });

  const showDetails = id =>
    setDialog({ open: true, type: 2, data: { id, item: list[id] } });

  useEffect(() => {
    let port = browser.runtime.connect({ name: "pm_port" });
    port.onMessage.addListener(res => {
      console.log(res);
      const { cycling, pandas, id } = res;
      setID(id);
      setCycling(cycling);
      setList(pandas);
    });
    return () => {
      port.onMessage.removeListener();
    };
  }, []);

  return (
    <ListContext.Provider
      value={{
        cycling,
        setCycling,
        id,
        list,
        addToList,
        removeFromList,
        updateInList,
        showDetails,
        sendList,
        sendDelays
      }}
    >
      <ManagerAppBar
        data={{ title: "Panda Manager", bottomBarVisible }}
        func={{ setDialog, setBottomBarVisible }}
      />

      <DelayContext.Provider value={{ delays, updateDelays }}>
        {bottomBarVisible ? <ManagerToolbar /> : null}
        <ManagerContent />
      </DelayContext.Provider>

      <Dialog open={dialog.open} onClose={onDialogClose}>
        {dialog.type == 1 ? <AddDialog close={onDialogClose} /> : null}
        {dialog.type == 2 ? (
          <DetailDialog data={dialog.data} close={onDialogClose} />
        ) : null}
      </Dialog>
    </ListContext.Provider>
  );
};

export default Manager;
