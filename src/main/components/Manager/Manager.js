import React, { useEffect, useRef, useState } from "react";

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
  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: null });

  const loadedRef = useRef(false);

  const updateDelays = items => {
    setDelays(items);
  };

  const addToList = item => {
    setList(prev => [...prev, { ...item }]);
  };

  const removeFromList = id => {
    let nList = [...list];
    nList.splice(id, 1);
    setList(nList);
  };

  const updateInList = (id, newItem) => {
    console.log(`update ${id}`);
    setList(prev => prev.map((item, i) => (i == id ? newItem : item)));
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
    if (loadedRef.current) {
      sendList(list);
      sendDelays(delays);
    } else loadedRef.current = true;
  }, [list, delays]);

  useEffect(() => {
    var port = browser.runtime.connect({ name: "pm_port" });
    port.onMessage.addListener(res => {
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
        showDetails
      }}
    >
      <ManagerAppBar
        data={{ list, title: "Panda Manager", cycling, bottomBarVisible }}
        func={{ setDialog, setCycling, setBottomBarVisible }}
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
