import React, { useEffect, useRef, useState } from "react";

import { Alert } from "@material-ui/lab";
import Dialog from "@material-ui/core/Dialog";

import MaterialTable, { MTableBody, MTableToolbar } from "material-table";

import { sendToBackground } from "miscUtils";
import { messages } from "constants";

import ManagerAppBar from "./ManagerAppBar/ManagerAppBar";
import PandaCard from "./PandaCard/PandaCard";
import AddDialog from "./Dialogs/AddDialog";
import DetailDialog from "./Dialogs/DetailDialog";

import { Check, Search, Clear, List, ListAlt } from "@material-ui/icons";

import { containerStyle, tableStyles } from "./styles";

const ManagerTable = props => {
  const [bottomBarVisible, setBottomBarVisible] = useState(false);
  const [dialog, setDialog] = useState({ open: false, type: null });
  const [list, setList] = useState(props.data.pandas);
  const [rowDisplay, setRowDisplay] = useState(false);
  const loadedRef = useRef(false);

  const sendList = list =>
    sendToBackground(messages.setSettingsValues, { pandas: list });

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

  const { style, headerStyle, cardContainerStyle, name, link } = tableStyles;

  const tableIcons = {
    Check,
    Clear,
    Search,
    ResetSearch: Clear
  };

  useEffect(() => {
    if (loadedRef.current) {
      sendList(list);
    } else {
      loadedRef.current = true;
    }
  }, [list]);

  return (
    <div style={containerStyle}>
      <ManagerAppBar
        data={{ list, title: "Pandas", bottomBarVisible, cycling: props.cycling }}
        func={{ setBottomBarVisible, setDialog }}
      />
      <MaterialTable
        icons={tableIcons}
        title="Pandas"
        data={list}
        style={style}
        options={{
          showTitle: false,
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
            title: "Req name/id, Hit ID",
            field: "name",
            cellStyle: name
          },
          {
            title: "Link",
            field: "link",
            cellStyle: link,
          },
          {
            title: "Description",
            field: "description",
            cellStyle: link,
          },
        ]}
        actions={[
          {
            icon: rowDisplay ? List : ListAlt,
            isFreeAction: true,
            type: 0,
            onClick: () => setRowDisplay(!rowDisplay)
          },
        ]}
        components={{
          Toolbar: props =>
            bottomBarVisible ? <MTableToolbar {...props} /> : null,
          Body: props => {
            const isEditing = props.hasAnyEditingRow;
            const cards = (
              <div style={cardContainerStyle}>
                {props.renderData.map(data => (
                  <PandaCard
                    data={data}
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
        ): null}
      </Dialog>
    </div>
  );
};

export default ManagerTable;
