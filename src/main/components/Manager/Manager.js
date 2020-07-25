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
  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: null });

  const loadedRef = useRef(false);

  const updateDelays = items => { setDelays(items); };

  const addToList = item => {
    setList(prev => [
      ...prev,
      { ...item, tableData: { id: list.length } }
    ]);
  };

  const removeFromList = item =>
    setList(prev =>
      prev.filter(value => value.tableData.id != item.tableData.id)
    );

  const updateInList = (oldItem, newItem) => {
    setList(prev =>
      prev.map((value, index) =>
        index == oldItem.tableData.id
          ? { ...newItem, tableData: { id: oldItem.tableData.id } } : value
      )
    );
  };

  const sendList = values =>
    sendToBackground(messages.setSettingsValues, { pandas: values });

  const sendDelays = values =>
    sendToBackground(messages.setSettingsValues, { delays: values });

  const onDialogClose = () =>
    setDialog({ open: false, type: null, data: null });

  const showDetails = item => setDialog({ open: true, type: 2, data: item });

  useEffect(() => {
    if (loadedRef.current) {
      sendList(list);
      sendDelays(delays);
    } else loadedRef.current = true;
  }, [list, delays]);

  useEffect(() => {
    var port = browser.runtime.connect({ name: "pm_port" });
    port.onMessage.addListener(res => {
      const { cycling, pandas } = res;
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
        cycling, setCycling,
        list, addToList, removeFromList, updateInList,
        showDetails
      }} >

      <ManagerAppBar
        data={{ list, title: "Panda Manager", cycling, bottomBarVisible }}
        func={{ setDialog, setCycling, setBottomBarVisible }} />

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
