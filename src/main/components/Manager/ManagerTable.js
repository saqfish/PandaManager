import React, { useEffect, useRef, useState } from "react";

import { Alert } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";

import MaterialTable, { MTableBody, MTableToolbar } from "material-table";

import * as browser from "webextension-polyfill";
import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import ManagerAppBar from "./ManagerAppBar/ManagerAppBar";
import PandaCard from "./PandaCard/PandaCard";
import AddDialog from "./Dialogs/AddDialog";
import DetailDialog from "./Dialogs/DetailDialog";
import ManagerToolbar from "./ManagerToolbar/ManagerToolbar";

import Checkbox from "@material-ui/core/Checkbox";
import { Check, Search, Clear, List, ListAlt } from "@material-ui/icons";

import { containerStyle, tableStyles } from "./styles";

const ManagerTable = props => {
  const [cycling, setCycling] = useState(props.cycling);
  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: null });
  const [list, setList] = useState(props.data.pandas);
  const [delays, setDelays] = useState(props.data.delays);
  const [rowDisplay, setRowDisplay] = useState(false);
  const loadedRef = useRef(false);

  const sendList = values =>
    sendToBackground(messages.setSettingsValues, { pandas: values });

  const sendDelays = values =>
    sendToBackground(messages.setSettingsValues, { delays: values });

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

  const onDialogClose = () =>
    setDialog({ open: false, type: null, data: null });

  const showDetails = item => setDialog({ open: true, type: 2, data: item });

  const {
    style,
    toolbarStyle,
    rowStyle,
    headerStyle,
    cardContainerStyle,
    enabled,
    name,
    link,
    description
  } = tableStyles;

  const tableIcons = {
    Check,
    Clear,
    Search,
    ResetSearch: Clear
  };

  useEffect(() => {
    if (loadedRef.current) {
      sendList(list);
      sendDelays(delays);
    } else {
      loadedRef.current = true;
    }
  }, [list, delays]);

  useEffect(() => {
    var port = browser.runtime.connect({ name: "scrapeConnection" });
    port.onMessage.addListener(res => {
      setList(res);
    });
    return () => {
      port.onMessage.removeListener();
    };
  }, []);

  return (
    <div style={containerStyle}>
      <ManagerAppBar
        data={{
          list,
          title: "Pandas",
          bottomBarVisible,
          cycling
        }}
        func={{ setBottomBarVisible, setDialog, setCycling }}
      />
      <MaterialTable
        icons={tableIcons}
        title="Pandas"
        data={list}
        style={style}
        options={{
          showTitle: false,
          rowStyle: rowStyle,
          headerStyle: headerStyle,
          detailPanelType: "single",
          padding: "dense",
          paging: false,
          showFirstLastPageButtons: false,
          addRowPosition: "first"
        }}
        localization={{
          body: { emptyDataSourceMessage: "" },
          pagination: {
            labelDisplayedRows: ""
          }
        }}
        columns={[
          {
            align: "left",
            title: "Enabled",
            field: "enabled",
            render: rowData => <Checkbox checked={rowData.enabled} />,
            cellStyle: enabled
          },
          {
            align: "left",
            title: "Req name/id, Hit ID",
            field: "name",
            cellStyle: name
          },
          {
            align: "left",
            title: "Link",
            field: "link",
            cellStyle: link
          },
          {
            align: "left",
            title: "Description",
            field: "description",
            cellStyle: description
          }
        ]}
        actions={[
          {
            icon: rowDisplay ? List : ListAlt,
            isFreeAction: true,
            type: 0,
            onClick: () => setRowDisplay(!rowDisplay)
          }
        ]}
        components={{
          Toolbar: props =>
            bottomBarVisible ? (
              <div style={toolbarStyle}>
                <ManagerToolbar data={delays} func={{ updateDelays }} />
                <MTableToolbar {...props} />
              </div>
            ) : null,
          Body: props => {
            const isEditing = props.hasAnyEditingRow;
            const cards = (
              <div style={cardContainerStyle}>
                {props.renderData.map(data => (
                  <PandaCard
                    data={{ data, cycling }}
                    func={{ showDetails, updateInList, removeFromList }}
                  />
                ))}
              </div>
            );
            const tableBody = rowDisplay ? <MTableBody {...props} /> : cards;
            const emptyListAlert = (
              <Alert severity="info">
                Looks like your panda list is empty. Try adding some items.
              </Alert>
            );

            const isValid = typeof list != "undefined" && list != null;

            const isListEmpty = isValid && list.length < 1;

            return isListEmpty && !isEditing ? emptyListAlert : tableBody;
          }
        }}
      />
      <Dialog open={dialog.open} onClose={onDialogClose}>
        {dialog.type == 1 ? (
          <AddDialog func={{ addToList, onDialogClose }} />
        ) : null}
        {dialog.type == 2 ? (
          <DetailDialog
            data={dialog.data}
            func={{ updateInList, onDialogClose }}
          />
        ) : null}
      </Dialog>
    </div>
  );
};

export default ManagerTable;
